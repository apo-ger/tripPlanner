import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  base: '/tripPlanner/',
  plugins: [react(), glsl()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
