import path from 'node:path'
import _ from 'lodash'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import makeParse from './parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const getDifferencies = (path1, path2) => {
  const file1 = makeParse(path1)
  const file2 = makeParse(path2)
  const diffLines = _.compact(genDiff(file1, file2).split(','))
    .map(line => line.replace(',', ''))
    .map(line => `  ${line}`)

  return `{\n${diffLines.join('\n')}\n}`
}

// Make function for finding differencies between two objects
const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.union(keys1, keys2).sort()
  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc += `+ ${key}: ${data2[key]},`
    }
    else if (!Object.hasOwn(data2, key)) {
      acc += `- ${key}: ${data1[key]},`
    }
    else if (data1[key] !== data2[key]) {
      acc += `- ${key}: ${data1[key]},+ ${key}: ${data2[key]},`
    }
    else {
      acc += `  ${key}: ${data1[key]},`
    }
    return acc
  }, '')
  return result
}

export default getDifferencies
