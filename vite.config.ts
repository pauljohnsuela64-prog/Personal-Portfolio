import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import deployment from './vercel.json' with { type: 'json' }
import { profile } from './src/content/profile.ts'

export default defineConfig({
  preview: { headers: Object.fromEntries(deployment.headers[0].headers.map(({ key, value }) => [key, value])) },
  server: {
    fs: {
      // Retain Vite's default deny patterns and protect local personal documents.
      deny: ['.env', '.env.*', '*.{crt,pem,key,p12,pfx,cer,der}', '.npmrc', '.yarnrc.yml', '**/.git/**', '**/.private/**'],
    },
  },
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-metadata',
    transformIndexHtml: () => [
      ...Object.entries({ 'og:type': 'website', 'og:title': profile.name + ' | ' + profile.title, 'og:description': profile.description }).map(([property, content]) => ({ tag: 'meta', attrs: { property, content } })),
      { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' } },
      { tag: 'title', children: `${profile.name} | ${profile.title}`, injectTo: 'head' },
      { tag: 'meta', attrs: { name: 'description', content: profile.description }, injectTo: 'head' },
    ],
  }],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
