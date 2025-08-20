import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'AgendaGov',
        short_name: 'AgendaGov',
        description: 'Aplicativo para gerenciar compromissos governamentais',
        theme_color: '#00529F',
        icons: [
          {
            src: 'public/brasao_to.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'public/brasao_to.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})