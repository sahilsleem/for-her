import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // relative paths for seamless static hosting (Netlify, Vercel, GitHub Pages)
  server: {
    host: true, // allows easy testing on mobile phones connected to same Wi-Fi
    port: 5173,
  }
});
