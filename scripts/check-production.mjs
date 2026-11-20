import { Buffer } from 'node:buffer'
import console from 'node:console'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    assert(!entry.name.startsWith('.') && !entry.isSymbolicLink(), 'Unexpected hidden file or link in dist')
    if (entry.isDirectory()) { checkDirectory(path); continue }
    assert(path === join('dist', 'robots.txt') || /\.(html|js|css|svg|jpe?g|png)$/i.test(entry.name), 'Unexpected production file type')
    const bytes = readFileSync(path)
    assert(!bytes.includes(Buffer.from('%PDF-')), 'PDF data in production output')
    const content = bytes.toString('utf8')
    assert(!/(?:[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:mailto:[\w.+-]|tel:[+\d(])|github\.com[/:]pauljohnsuela64-prog\/polpol-ai|-----BEGIN [\w ]*PRIVATE KEY-----|gh[pousr]_[\w]{30,}|AKIA[A-Z0-9]{16})/i.test(content), 'Potential private value in production output')
  }
}

checkDirectory('dist')
console.log('Production privacy checks passed')
