import getDifferencies from '../src/index.js'
import { test, expect } from '@jest/globals'
import { getFixturePath } from '../src/index.js'

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
