import { defineConfig } from '@vite-pwa/assets-generator/config'

/**
 * Gera os ícones da PWA a partir de `public/favicon.svg` (delta âmbar sobre grafite).
 * Rode com: `npx pwa-assets-generator`
 *
 * Customizações sobre o preset minimal-2023:
 *  - `transparent` (purpose "any"): arte cheia, mantém os cantos arredondados.
 *  - `maskable` e `apple`: fundo grafite (#0d1117) preenchendo 100% + padding de safe
 *    zone, para o logo não ser cortado pela máscara do launcher (Android) nem ficar
 *    com borda transparente no iOS.
 */
const GRAFITE = '#0d1117'

export default defineConfig({
  images: ['public/favicon.svg'],
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, 'favicon.ico']],
      padding: 0,
    },
    maskable: {
      sizes: [512],
      padding: 0.1,
      resizeOptions: { background: GRAFITE },
    },
    apple: {
      sizes: [180],
      padding: 0.1,
      resizeOptions: { background: GRAFITE },
    },
  },
})
