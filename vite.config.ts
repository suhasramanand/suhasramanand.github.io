import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@react-three/fiber", "@react-three/drei"],
    exclude: [],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Don't manually chunk React - let Vite handle it automatically
            // This ensures React is always available when needed
            if (
              id.includes('/react/') || 
              id.includes('\\react\\') ||
              id.includes('/react-dom/') ||
              id.includes('\\react-dom\\') ||
              id.includes('/scheduler/') ||
              id.includes('\\scheduler\\') ||
              (id.includes('react') && !id.includes('/') && !id.includes('\\'))
            ) {
              return undefined; // Let Vite handle React bundling
            }
            
            // Chunk large dependencies separately
            if (id.includes('@react-three')) {
              return 'vendor-r3f';
            }
            if (id.includes('three') && !id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            
            // Everything else in vendor chunk
            return 'vendor';
          }
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
  }
}));