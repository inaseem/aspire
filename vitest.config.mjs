import react from '@vitejs/plugin-react'
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
  ],
  test: {
    dir: 'src',
    environment: 'jsdom',
    globals: true,
    retry: 0,
    testTimeout: 30000, // 30 seconds
    setupFiles: ['./vitest-setup.ts'],
    css: false,
    deps: {
      optimizer: {
        web: {
          enabled: true,
        },
      },
    },
    reporters: [
      ['default'],
      [
        'json',
        {
          outputFile: path.join(__dirname, './', 'coverage/master-report.json'),
        },
      ],
    ],
  },
});
