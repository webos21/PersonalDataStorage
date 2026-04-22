import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        eslint({
            cache: false,
            include: ['./src/**/*.js', './src/**/*.jsx'],
            exclude: []
        }),
        react(),
        viteTsconfigPaths(),
        svgrPlugin()
    ],
    server: {
        port: 3000,
        open: true
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }
});
