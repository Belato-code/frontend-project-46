import getDiff from '../src/index.js'
import fs from 'fs'
import { test, expect } from '@jest/globals'
import { getFixturePath } from '../src/index.js'

const path1 = getFixturePath('filepath1.json')
const path2 = getFixturePath('filepath2.yml')

test('Find differencies of JSON files', () => {
  const expected = fs.readFileSync(getFixturePath('expected_filepath.txt'), 'utf-8')

  expect(getDiff(path1, path2)).toBe(expected)
})

test('Find differencies of YAML files', () => {
  const path = getFixturePath('file3.txta')
  const expected = fs.readFileSync(getFixturePath('expected_filepath.txt'), 'utf-8')

  expect(() => getDiff(path, path1)).toThrow()
  expect(getDiff(path1, path2)).toBe(expected)
})

test('Format plain', () => {
  const expected = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8')

  expect(getDiff(path1, path2, 'plain')).toBe(expected)
  expect(() => getDiff(path1, path2, 'random')).toThrow()
})

test('Format json', () => {
  function isJSON(string) {
    try {
      JSON.parse(string)
      return true
    }
    catch {
      return false
    }
  }

  expect(isJSON(getDiff(path1, path2, 'json'))).toBeTruthy()
})
