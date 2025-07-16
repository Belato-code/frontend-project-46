import _ from 'lodash'

const genDiff = (file1, file2) => {
  const inner = (data1, data2) => {
    const keys1 = Object.keys(data1)
    const keys2 = Object.keys(data2)
    const keys = _.union(keys1, keys2).sort()
    const result = keys.map((key) => {
      const value1 = data1[key]
      const value2 = data2[key]

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        const children = inner(value1, value2)
        return {
          key,
          children,
          status: 'nested',
        }
      }
      if (!_.has(data1, key)) {
        return {
          key,
          status: 'added',
          value: value2,
        }
      }
      if (!_.has(data2, key)) {
        return {
          key,
          status: 'removed',
          value: value1,
        }
      }
      if (!_.isEqual(value1, value2)) {
        return {
          key,
          status: 'changed',
          oldValue: value1,
          newValue: value2,
        }
      }
      return {
        key,
        status: 'unchanged',
        value: value1,
      }
    })

    return result
  }
  return inner(file1, file2, '')
}

export default genDiff
