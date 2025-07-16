import _ from 'lodash'

const isComplex = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return _.isPlainObject(value) ? '[complex value]' : `${value}`
}

const dispatcher = {
  added: (data, path) => `Property '${path}' was added with value: ${isComplex(data.value)}`,
  removed: (_, path) => `Property '${path}' was removed`,
  changed: (data, path) => `Property '${path}' was updated. From ${isComplex(data.oldValue)} to ${isComplex(data.newValue)}`,
  unchanged: () => null,
}

const plain = (diffTree) => {
  const inner = (tree, path = '') => {
    const lines = tree.map((item) => {
      const currentPath = path ? `${path}.${item.key}` : item.key
      const handler = dispatcher[item.status]
      if (item.status === 'nested') {
        return inner(item.children, currentPath)
      }
      if (!handler) {
        throw new Error(`No such status: ${item.status}`)
      }
      return handler(item, currentPath)
    })
    return _.compact(lines).join('\n')
  }
  return inner(diffTree)
}

export default plain
