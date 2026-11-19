import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import { profile } from './src/content/profile.ts'

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-metadata',
    transformIndexHtml: () => [
      { tag: 'title', children: `${profile.name} | IT Portfolio`, injectTo: 'head' },
      { tag: 'meta', attrs: { name: 'description', content: profile.description }, injectTo: 'head' },
    ],
  }],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
