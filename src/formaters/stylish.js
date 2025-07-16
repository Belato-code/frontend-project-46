import _ from 'lodash'

const indent = (depth, subtractor = 0, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - subtractor)

const stringify = (data, depth = 1) => {
  if (!_.isObject(data) || data === null) {
    return String(data)
  }

  const lineIndent = indent(depth)
  const closingIndent = indent(depth, 4)
  const lines = Object.entries(data).map(([key, value]) => {
    return `${lineIndent}${key}: ${stringify(value, depth + 1)}`
  })

  return ['{', ...lines, `${closingIndent}}`].join('\n')
}

const stylish = (diffTree) => {
  const dispatcher = {
    added: (node, depth) => [`${indent(depth, 2)}+ ${node.key}: ${stringify(node.value, depth + 1)}`],
    removed: (node, depth) => [`${indent(depth, 2)}- ${node.key}: ${stringify(node.value, depth + 1)}`],
    changed: (node, depth) => [
      `${indent(depth, 2)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
      `${indent(depth, 2)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
    ],
    unchanged: (node, depth) => [`${indent(depth, 2)}  ${node.key}: ${stringify(node.value, depth + 1)}`],
    nested: (node, depth) => [`${indent(depth)}${node.key}: ${iter(node.children, depth + 1)}`],
  }

  const iter = (nodes, depth = 1) => {
    const closingIndent = indent(depth, 4)
    const lines = nodes.flatMap((node) => {
      const handler = dispatcher[node.status]
      if (!handler) {
        throw new Error(`No such status: ${node.status}`)
      }
      return handler(node, depth)
    })

    return ['{', ...lines, `${closingIndent}}`].join('\n')
  }

  return iter(diffTree)
}

export default stylish
