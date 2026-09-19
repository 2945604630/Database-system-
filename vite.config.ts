import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const runtimeEnv = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env

export default defineConfig({
  base: runtimeEnv?.GITHUB_ACTIONS === 'true' ? '/Database-system-/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})

