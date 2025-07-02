import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import getDifferencies from '../src/index.js'
import { test, expect } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('Find differencies', () => {
  const strings = [
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true',
  ]
  const lines = strings.map(item => `  ${item}`).join('\n')
  const expected = `{\n${lines}\n}`
  const path1 = getFixturePath('file1.json')
  const path2 = getFixturePath('file2.json')

  expect(getDifferencies(path1, path2)).toBe(expected)
})
