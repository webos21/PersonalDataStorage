import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        }
    },
    test: {
        // Enable global APIs like 'describe', 'it', 'expect'
        globals: true,
        // Use jsdom to simulate a browser environment
        environment: 'jsdom',
        // Setup file for custom matchers (like .toBeInTheDocument())
        setupFiles: './src/test/setup.ts',
        // Automatically clear mocks between tests
        clearMocks: true,
        // If watch is disabled, the browser ui is not working
        watch: false
    }
});
