// Binds short Russian prepositions/conjunctions to the next word with a non-breaking space,
// so they never hang at the end of a line, and keeps the dash on the line of the word before it.
// Runs automatically before every build (prebuild). Manual: `npm run typograph`, check only: `npm run typograph:check`.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const ROOTS = ['app', 'components', 'lib/data']
const SKIP = [/[\\/]api[\\/]/]
const EXT = new Set(['.ts', '.tsx'])

const SHORT = [
  'в', 'во', 'и', 'а', 'с', 'со', 'к', 'ко', 'у', 'о', 'об', 'обо', 'на', 'не', 'ни', 'но', 'да', 'по', 'за', 'от',
  'до', 'из', 'изо', 'без', 'для', 'при', 'про', 'над', 'под', 'или', 'что', 'как', 'я', 'мы', 'вы',
]
const NBSP = '\u00A0'
// Short word preceded by a non-letter boundary and followed by a plain space and a word, digit, quote or bracket
const shortRe = new RegExp(
  `(^|[\\s«"'(\\[{>—–-])(${SHORT.join('|')})( )(?=[А-Яа-яЁёA-Za-z0-9«"(\\[{])`,
  'giu',
)
const dashRe = / (—)/g

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (SKIP.some((r) => r.test(p))) continue
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (EXT.has(extname(p))) out.push(p)
  }
  return out
}

function fix(text) {
  let prev
  let next = text
  // Repeat so chains like «и в работе» bind fully
  do {
    prev = next
    next = next.replace(shortRe, (_, pre, word) => `${pre}${word}${NBSP}`)
  } while (next !== prev)
  return next.replace(dashRe, `${NBSP}$1`)
}

const check = process.argv.includes('--check')
let changed = 0
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const src = readFileSync(file, 'utf8')
    // Only touch lines that contain Cyrillic, so code never changes
    const out = src
      .split('\n')
      .map((line) => (/[А-Яа-яЁё]/.test(line) ? fix(line) : line))
      .join('\n')
    if (out !== src) {
      changed++
      if (check) console.log(`hanging words: ${file}`)
      else writeFileSync(file, out)
    }
  }
}
if (check && changed) {
  console.error(`${changed} file(s) need typograph. Run: npm run typograph`)
  process.exit(1)
}
console.log(check ? 'typograph: ok' : `typograph: ${changed} file(s) updated`)
