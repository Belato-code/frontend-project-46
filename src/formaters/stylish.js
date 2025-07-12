import _ from 'lodash'

const stringify = (data, depth = 1) => {
  if (!_.isObject(data) || data === null) {
    return String(data)
  }

  const indent = ' '.repeat(4 * (depth + 1) - 4)
  const closingIndent = ' '.repeat(4 * depth - 4)
  const lines = Object.entries(data).map(([key, value]) => {
    return `${indent}${key}: ${stringify(value, depth + 1)}`
  })

  return ['{', ...lines, `${closingIndent}}`].join('\n')
}

const stylish = (diffTree) => {
  const iter = (nodes, depth = 1) => {
    const indent = ' '.repeat(4 * depth - 4)
    const nodeIndent = ' '.repeat(4 * depth)
    const currentIndent = ' '.repeat(4 * depth - 2)
    const lines = nodes.flatMap((node) => {
      const { key, status } = node

      switch (status) {
        case 'nested':
          return [`${nodeIndent}${key}: ${iter(node.children, depth + 1)}`]
        case 'added':
          return [`${currentIndent}+ ${key}: ${stringify(node.value, depth + 1)}`]
        case 'removed':
          return [`${currentIndent}- ${key}: ${stringify(node.value, depth + 1)}`]
        case 'unchanged':
          return [`${currentIndent}  ${key}: ${stringify(node.value, depth + 1)}`]
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
            `${currentIndent}+ ${key}: ${stringify(node.newValue, depth + 1)}`,
          ]
        default:
          throw new Error(`Unknown status: ${status}`)
      }
    })

    return ['{', ...lines, `${indent}}`].join('\n')
  }

  return iter(diffTree)
}

export default stylish
