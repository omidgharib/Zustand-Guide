import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { PWAConfig } from './src/lib/config';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Root directory of your source code (default is process.cwd())
  root: '.',

  // Base public path when served in production
  // Accepts: '/', './', 'https://cdn.example.com/assets/'
  base: '/',

  // Resolve settings help configure module resolution
  resolve: {
    alias: {
      // Allows use of @/ instead of relative paths like ../../
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'], // Import file types without extensions
  },

  css: {
    devSourcemap: true,
  },
  plugins: [
    viteCompression({
      verbose: true, // Log compressed files
      disable: false, // Set to true to disable compression
      threshold: 0, // Only assets > 1KB are compressed
      algorithm: 'gzip', // gzip | brotliCompress | deflate | deflateRaw
      ext: '.gz', // File extension for compressed files
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
    VitePWA(PWAConfig),
  ],
  // Environment variable prefix
  // Only variables starting with VITE_ are exposed to your code
  envPrefix: 'VITE_',

  // Server config for dev mode
  server: {
    host: 'localhost', // '0.0.0.0' to expose to local network
    port: 5173, // Default port
    open: true, // Opens browser on start
    https: false, // Enable HTTPS
    proxy: {
      // Proxy API calls to backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // Build configuration for production
  build: {
    outDir: 'dist', // Output directory
    sourcemap: false, // Generate source maps
    minify: 'esbuild', // 'esbuild' (fast) | 'terser' (slower, more compressive)
    cssCodeSplit: true, // Separate CSS into individual files
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks(id) {
          // Separate vendor chunking
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },

  // OptimizeDeps is used for faster cold-starts during development
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // exclude: ['your-heavy-lib'], // Optionally exclude packages
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
});
