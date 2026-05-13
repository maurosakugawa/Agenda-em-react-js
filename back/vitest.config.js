// back/vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,

        // ❌ REMOVA ou COMENTE esta linha se o arquivo não existe:
        // setupFiles: ['./test/helpers/setup.js'],

        include: [
            'test/**/*.{test,spec}.?(c|m)[jt]s?(x)',
            'src/**/*.test.js'
        ],

        exclude: [
            '**/node_modules/**',
            '**/.git/**',
            '**/dist/**'
        ],

        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'test/']
        }
    }
});