import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  publicDir: 'public',
  plugins: [
    // Minimal JSX transform via esbuild (built-in to Vite)
    {
      name: 'jsx-support',
      config() {
        return {
          esbuild: {
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
          }
        };
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap']
  },
  server: {
    port: 5173,
    open: true,
    host: true,
    fs: {
      strict: false,
      allow: [
        __dirname,
        path.resolve(__dirname, 'public'),
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ]
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
