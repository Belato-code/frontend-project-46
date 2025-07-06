import getDifferencies from '../src/index.js'
import fs from 'fs'
import { test, expect } from '@jest/globals'
import { getFixturePath } from '../src/index.js'

test('Find differencies of JSON files', () => {
  const path1 = getFixturePath('file1.json')
  const path2 = getFixturePath('file2.json')
  const expected = fs.readFileSync(getFixturePath('expect_file.txt'), 'utf-8')

  expect(getDifferencies(path1, path2)).toBe(expected)
})

test('Find differencies of YAML files', () => {
  const path1 = getFixturePath('file1.yaml')
  const path2 = getFixturePath('file2.yaml')
  const path = getFixturePath('file3.txta')
  const expected = fs.readFileSync(getFixturePath('expect_file.txt'), 'utf-8')

  expect(() => getDifferencies(path, path1)).toThrow()
  expect(getDifferencies(path1, path2)).toBe(expected)
})
