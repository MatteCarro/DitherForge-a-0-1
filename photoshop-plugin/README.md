# DitherForge Photoshop Plugin

Plugin UXP per Adobe Photoshop che applica dithering retro al livello selezionato.

## File creati

- `manifest.json`: configurazione del plugin UXP.
- `index.html`: pannello Photoshop.
- `styles.css`: interfaccia ispirata al design esistente.
- `data.js`: console, bit depth, algoritmi e palette.
- `dither.js`: algoritmi di dithering.
- `main.js`: collegamento tra UI e Photoshop UXP.

## Installazione in Photoshop

1. Apri `Adobe UXP Developer Tool`.
2. Clicca `Add Plugin`.
3. Seleziona il file `manifest.json` dentro questa cartella.
4. Clicca `Load`.
5. In Photoshop apri il pannello da `Plugins > DitherForge`.

## Uso

1. Apri un documento in Photoshop.
2. Seleziona un livello pixel.
3. Scegli console, bit depth, algoritmo e palette.
4. Premi `APPLICA`.

Il risultato viene creato come nuovo livello, lasciando invariato il livello originale.

## Note

I file di design presenti nella cartella principale non sono stati modificati. Questa cartella contiene una versione UXP autonoma del plugin.
