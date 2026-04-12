import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './tests/coverage',
      include: ['components/**/*.{js,jsx}', 'sections/**/*.{js,jsx}', 'contexts/**/*.{js,jsx}', 'i18n.js'],
      exclude: ['node_modules', 'dist'],
    },
  },
})
