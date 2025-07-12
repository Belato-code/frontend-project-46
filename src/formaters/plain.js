import _ from 'lodash'

const plain = (diffTree) => {
  const isComplex = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`
    }
    return _.isPlainObject(value) ? '[complex value]' : `${value}`
  }
  const lines = diffTree.flatMap((item) => {
    const status = item.status
    switch (status) {
      case 'removed':
        return [`Property '${item.path}' was removed`]
      case 'added':
        return [`Property '${item.path}' was added with value: ${isComplex(item.value)}`]
      case 'changed':
        return [`Property '${item.path}' was updated. From ${isComplex(item.oldValue)} to ${isComplex(item.newValue)}`]
      case 'nested':
        return plain(item.children)
      default: break
    }
  })
  return _.compact(lines).join('\n')
}

export default plain
