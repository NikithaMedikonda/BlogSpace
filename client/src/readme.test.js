import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readme = readFileSync(new URL('../../README.md', import.meta.url), 'utf8')

test('the root README presents the project tech stack', () => {
  const section = readme.match(/^## Tech stack\s*\n([\s\S]*?)(?=^## |(?![\s\S]))/m)
  assert.ok(section, 'missing Tech stack section')
  for (const technology of ['React', 'React Router', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'node-postgres']) {
    assert.ok(section[1].includes(technology), `missing ${technology} from the tech stack`)
  }
})
