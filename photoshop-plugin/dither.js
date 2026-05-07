function hexToRgb(hex) {
  if (typeof hex !== "string") return hex;
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16)
  };
}

function nearestPaletteColor(r, g, b, palette) {
  let best = palette[0];
  let bestDistance = Infinity;

  for (const color of palette) {
    const p = color;
    const dr = r - p.r;
    const dg = g - p.g;
    const db = b - p.b;
    const distance = dr * dr + dg * dg + db * db;

    if (distance < bestDistance) {
      best = p;
      bestDistance = distance;
    }
  }

  return best;
}

function bayerThreshold(x, y, size) {
  const bayer2 = [
    [0, 2],
    [3, 1]
  ];
  const bayer4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ];
  const bayer8 = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21]
  ];
  const matrix = size === 2 ? bayer2 : size === 4 ? bayer4 : bayer8;
  return matrix[y % size][x % size] / (size * size) - 0.5;
}

function applyOrderedDither(data, width, height, palette, options) {
  const output = new Uint8Array(data);
  const size = options.algorithm === "bayer2" ? 2 : options.algorithm === "bayer4" ? 4 : 8;
  const strength = options.algorithm === "halftone" ? 36 : 48;
  const scale = Math.max(1, Math.round(options.scale || 1));

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;
      if (options.keepAlpha && output[i + 3] === 0) continue;

      const px = Math.floor(x / scale);
      const py = Math.floor(y / scale);
      let threshold = bayerThreshold(px, py, size) * strength;
      if (options.algorithm === "ordered-line") threshold = ((px + py) % 6 - 3) * 8;
      if (options.algorithm === "blue-noise") threshold = (Math.sin((px * 12.9898 + py * 78.233)) * 43758.5453 % 1) * 42;
      if (options.algorithm === "halftone") {
        const dx = px % 8 - 3.5;
        const dy = py % 8 - 3.5;
        threshold = (Math.sqrt(dx * dx + dy * dy) - 3) * 16;
      }

      const r = Math.max(0, Math.min(255, output[i] + threshold));
      const g = Math.max(0, Math.min(255, output[i + 1] + threshold));
      const b = Math.max(0, Math.min(255, output[i + 2] + threshold));
      const nearest = nearestPaletteColor(r, g, b, palette);
      output[i] = nearest.r;
      output[i + 1] = nearest.g;
      output[i + 2] = nearest.b;
    }
  }

  return output;
}

function getDiffusionKernel(algorithm) {
  const kernels = {
    fs: { div: 16, items: [[1, 0, 7], [-1, 1, 3], [0, 1, 5], [1, 1, 1]] },
    atkinson: { div: 8, items: [[1, 0, 1], [2, 0, 1], [-1, 1, 1], [0, 1, 1], [1, 1, 1], [0, 2, 1]] },
    jjn: { div: 48, items: [[1, 0, 7], [2, 0, 5], [-2, 1, 3], [-1, 1, 5], [0, 1, 7], [1, 1, 5], [2, 1, 3], [-2, 2, 1], [-1, 2, 3], [0, 2, 5], [1, 2, 3], [2, 2, 1]] },
    stucki: { div: 42, items: [[1, 0, 8], [2, 0, 4], [-2, 1, 2], [-1, 1, 4], [0, 1, 8], [1, 1, 4], [2, 1, 2], [-2, 2, 1], [-1, 2, 2], [0, 2, 4], [1, 2, 2], [2, 2, 1]] },
    burkes: { div: 32, items: [[1, 0, 8], [2, 0, 4], [-2, 1, 2], [-1, 1, 4], [0, 1, 8], [1, 1, 4], [2, 1, 2]] },
    sierra: { div: 4, items: [[1, 0, 2], [-1, 1, 1], [0, 1, 1]] }
  };
  return kernels[algorithm] || kernels.fs;
}

function applyErrorDiffusion(data, width, height, palette, options) {
  const buffer = Float32Array.from(data);
  const output = new Uint8Array(data);
  const kernel = getDiffusionKernel(options.algorithm);

  for (let y = 0; y < height; y += 1) {
    const reverse = options.serpentine && y % 2 === 1;

    for (let sx = 0; sx < width; sx += 1) {
      const x = reverse ? width - 1 - sx : sx;
      const i = (y * width + x) * 4;
      if (options.keepAlpha && output[i + 3] === 0) continue;

      const oldR = Math.max(0, Math.min(255, buffer[i]));
      const oldG = Math.max(0, Math.min(255, buffer[i + 1]));
      const oldB = Math.max(0, Math.min(255, buffer[i + 2]));
      const next = nearestPaletteColor(oldR, oldG, oldB, palette);

      output[i] = next.r;
      output[i + 1] = next.g;
      output[i + 2] = next.b;

      const errR = oldR - next.r;
      const errG = oldG - next.g;
      const errB = oldB - next.b;

      for (const [kx, ky, weight] of kernel.items) {
        const tx = x + (reverse ? -kx : kx);
        const ty = y + ky;
        if (tx < 0 || tx >= width || ty < 0 || ty >= height) continue;

        const ti = (ty * width + tx) * 4;
        const factor = weight / kernel.div;
        buffer[ti] += errR * factor;
        buffer[ti + 1] += errG * factor;
        buffer[ti + 2] += errB * factor;
      }
    }
  }

  return output;
}

function ditherImageData(imageData, options) {
  const diffusion = ["fs", "atkinson", "jjn", "stucki", "burkes", "sierra"];
  const palette = options.paletteColors.map(hexToRgb);
  const w = imageData.width;
  const h = imageData.height;
  const srcData = imageData.data;
  const result = diffusion.includes(options.algorithm)
    ? applyErrorDiffusion(srcData, w, h, palette, options)
    : applyOrderedDither(srcData, w, h, palette, options);

  return {
    width: w,
    height: h,
    data: result,
    colorProfile: imageData.colorProfile || "sRGB IEC61966-2.1",
    colorSpace: imageData.colorSpace || "RGB",
    componentSize: imageData.componentSize || 8,
    components: imageData.components || 4,
    hasAlpha: imageData.hasAlpha !== undefined ? imageData.hasAlpha : true,
    type: imageData.type || "image/uncompressed"
  };
}
