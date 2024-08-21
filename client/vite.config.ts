import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist', // Make sure this matches where you want to output files
    assetsDir: 'assets', // Ensure assets are organized as expected
  },
});

