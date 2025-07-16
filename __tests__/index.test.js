import getDiff from '../src/index.js'
import fs from 'fs'
import { test, expect } from '@jest/globals'
import { getFixturePath } from '../src/index.js'
import stylish from '../src/formaters/stylish.js'
import plain from '../src/formaters/plain.js'
import parse from '../src/parsers.js'

const path1 = getFixturePath('filepath1.json')
const path2 = getFixturePath('filepath2.yml')
const path3 = getFixturePath('filepath3.yml')
const expectedStylish = fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8')
const expectedPlain = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8')
const expectedJson = fs.readFileSync(getFixturePath('expected.json'), 'utf-8')

test.each`
    format     | expected
    ${'stylish'} | ${expectedStylish}
    ${'plain'}   | ${expectedPlain}
    ${'json'}    | ${expectedJson}
  `('Right format $format', ({ format, expected }) => {
  expect(getDiff(path1, path2, format)).toEqual(expected)
})

test('Throw error', () => {
  expect(() => getDiff(path2, path1, 'test')).toThrow()
  expect(() => getDiff(path2, path3)).toThrow()
  expect(() => plain([{ key: 'key', status: 'new', value: 'value1' }])).toThrow()
  expect(() => stylish([{ key: 'key', status: 'new', value: 'value1' }])).toThrow()
  expect(() => parse({ key: 'key', status: 'new', value: 'value1' }, '.xmlxs')).toThrow()
})
