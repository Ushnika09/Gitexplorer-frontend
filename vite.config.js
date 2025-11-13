import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // 👈 crucial for relative asset paths during deployment
  build: {
    outDir: 'build', // optional: match Netlify's publish directory
  },
})
