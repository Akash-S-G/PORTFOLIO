import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-core': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 800
  },
  server: {
    port: 5173,
    host: true
  }
});
