import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  server: {
    hmr: {
        overlay: false,
    },
},

  plugins: [
    tailwindcss(),
  ],
//   extend: {
//     backgroundImage: {
//       'hero': "url('./src/assets/concetto-di-acquisto-carrello-del-supermercato-soldi-e-regali-sullo-sfondo_494741-29308.avif')",
//     },
// }
})