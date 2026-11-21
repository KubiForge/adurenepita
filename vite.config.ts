import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-chat-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && (req.url === '/api/chat' || req.url.startsWith('/api/chat?'))) {
            try {
              const chatModule = await server.ssrLoadModule('./api/chat.ts');
              const handler = chatModule.default;
              await handler(req, res);
            } catch (err) {
              console.error('[ViteDevServer] Error in /api/chat dev server:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  error: 'Dev server error while handling /api/chat',
                })
              );
            }
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});
