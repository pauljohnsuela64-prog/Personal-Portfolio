import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import deployment from './vercel.json' with { type: 'json' }
import { profile } from './src/content/profile.ts'

const productionUrl = 'https://personal-portfolio-two-alpha-99.vercel.app/'
const socialImage = new URL(profile.photoLarge, productionUrl).href
const title = `${profile.name} | ${profile.title}`

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
      { tag: 'link', attrs: { rel: 'canonical', href: productionUrl } },
      ...Object.entries({
        'og:type': 'website',
        'og:url': productionUrl,
        'og:title': title,
        'og:description': profile.description,
        'og:image': socialImage,
        'og:image:alt': `Portrait of ${profile.name}`,
      }).map(([property, content]) => ({ tag: 'meta', attrs: { property, content } })),
      ...Object.entries({
        'twitter:card': 'summary',
        'twitter:title': title,
        'twitter:description': profile.description,
        'twitter:image': socialImage,
        'twitter:image:alt': `Portrait of ${profile.name}`,
      }).map(([name, content]) => ({ tag: 'meta', attrs: { name, content } })),
      { tag: 'title', children: title, injectTo: 'head' },
      { tag: 'meta', attrs: { name: 'description', content: profile.description }, injectTo: 'head' },
    ],
  }],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
