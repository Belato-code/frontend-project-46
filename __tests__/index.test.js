import getDiff from '../src/index.js'
import fs from 'fs'
import { test, expect } from '@jest/globals'
import { getFixturePath } from '../src/index.js'

test('Find differencies of JSON files', () => {
  const path1 = getFixturePath('filepath1.json')
  const path2 = getFixturePath('filepath2.json')
  const expected = fs.readFileSync(getFixturePath('expected_filepath.txt'), 'utf-8')

  expect(getDiff(path1, path2)).toBe(expected)
})

test('Find differencies of YAML files', () => {
  const path1 = getFixturePath('filepath1.yml')
  const path2 = getFixturePath('filepath2.yml')
  const path = getFixturePath('file3.txta')
  const expected = fs.readFileSync(getFixturePath('expected_filepath.txt'), 'utf-8')

  expect(() => getDiff(path, path1)).toThrow()
  expect(getDiff(path1, path2)).toBe(expected)
})
