import path from 'node:path'
import { cwd } from 'node:process'
import fs from 'node:fs'
import _ from 'lodash'

const getDifferencies = (path1, path2) => {
  const file1 = JSON.parse(fs.readFileSync(makePath(path1), 'utf8'))
  const file2 = JSON.parse(fs.readFileSync(makePath(path2), 'utf8'))
  const stringsOfDiff = genDiff(file1, file2).split(',')
  return `{\n  ${stringsOfDiff.join('\n  ')}\n}`
}

const makePath = filePath => path.resolve(cwd(), filePath)

// Make function for finding differencies between two objects
const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.union(keys1, keys2).sort()
  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc += `- ${key}: ${data1[key]},`
    }
    else if (!Object.hasOwn(data2, key)) {
      acc += `+ ${key}: ${data2[key]},`
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
