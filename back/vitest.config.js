// back/vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ✅ Single thread para evitar conflito do PGlite
    singleThread: true,
    
    // Isolamento entre testes
    isolate: true,
    
    // Timeouts maiores para inicialização do PGlite
    testTimeout: 30000,
    hookTimeout: 30000,
    
    // Ambiente e configurações globais
    environment: 'node',
    globals: true,
    
    env: {
        NODE_ENV: 'test'
    },
    
    // Arquivos de teste a incluir
    include: [
      'test/**/*.{test,spec}.?(c|m)[jt]s?(x)',
      'src/**/*.test.js'
    ],
    
    // Arquivos a excluir
    exclude: [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      'back/pgdata/**'
    ],
    
    // Configuração de coverage (opcional)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/', 'pgdata/']
    }
  }
});