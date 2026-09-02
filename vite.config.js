import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base matches GitHub Pages repo path — do not change without updating Pages URL
export default defineConfig({
  plugins: [react()],
  base: '/YosiDaturaPhotoGraph-/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2019',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animation: ['gsap'],
        },
      },
    },
  },
});
