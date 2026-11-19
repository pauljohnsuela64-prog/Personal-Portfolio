import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import { profile } from './src/content/profile.ts'

export default defineConfig({
  server: {
    fs: {
      // Retain Vite's default deny patterns and protect local personal documents.
      deny: ['.env', '.env.*', '*.{crt,pem,key,p12,pfx,cer,der}', '.npmrc', '.yarnrc.yml', '**/.git/**', '**/.private/**'],
    },
  },
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-metadata',
    transformIndexHtml: () => [
      { tag: 'title', children: `${profile.name} | ${profile.title}`, injectTo: 'head' },
      { tag: 'meta', attrs: { name: 'description', content: profile.description }, injectTo: 'head' },
    ],
  }],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
