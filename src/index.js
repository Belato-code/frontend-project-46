import path from 'node:path'
import { cwd } from 'node:process'
import fs from 'node:fs'
import _ from 'lodash'

const makePath = filePath => path.resolve(cwd(), filePath)
const getDifferencies = (path1, path2) => {
  const file1 = JSON.parse(fs.readFileSync(makePath(path1), 'utf8'))
  const file2 = JSON.parse(fs.readFileSync(makePath(path2), 'utf8'))
  const stringsOfDiff = genDiff(file1, file2)
  return `{\n${stringsOfDiff.join('\n')}\n}`
}

// Make function for finding differencies between two objects
const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.union(keys1, keys2).sort()

  let result = ''
  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      result += `  - ${key}: ${data1[key]},`
    }
    else if (!Object.hasOwn(data2, key)) {
      result += `  + ${key}: ${data2[key]},`
    }
    else if (data1[key] !== data2[key]) {
      result += `  - ${key}: ${data1[key]},  + ${key}: ${data2[key]},`
    }
    else {
      result += `    ${key}: ${data1[key]},`
    }
  }

  return _.compact(result.split(','))
}

export default getDifferencies
