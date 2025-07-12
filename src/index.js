import _ from 'lodash'
import makeParse from './parsers.js'
import stylish from './formaters/stylish.js'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const getDiff = (path1, path2, format = 'stylish') => {
  const formats = {
    stylish: stylish,
  }
  const file1 = makeParse(path1)
  const file2 = makeParse(path2)

  return formats[format](genDiff(file1, file2))
}

const genDiff = (file1, file2) => {
  const makeDiff = (data1, data2, path) => {
    const keys1 = Object.keys(data1)
    const keys2 = Object.keys(data2)
    const keys = _.union(keys1, keys2).sort()
    const result = keys.flatMap((key) => {
      const currentPath = path ? `${path}.${key}` : key
      const value1 = data1[key]
      const value2 = data2[key]

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        const children = makeDiff(value1, value2, currentPath)
        return {
          key,
          children,
          path: currentPath,
          status: 'nested',
        }
      }
      else if (!_.has(data1, key)) {
        return {
          key,
          path: currentPath,
          status: 'added',
          value: value2,
        }
      }
      else if (!_.has(data2, key)) {
        return {
          key,
          path: currentPath,
          status: 'removed',
          value: value1,
        }
      }
      else if (!_.isEqual(value1, value2)) {
        return {
          key,
          path: currentPath,
          status: 'changed',
          oldValue: value1,
          newValue: value2,
        }
      }
      return {
        key,
        path: currentPath,
        status: 'unchanged',
        value: value1,
      }
    })

    return result
  }
  return makeDiff(file1, file2, '')
}

export default getDiff
