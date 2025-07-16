import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

export default (formatName, data) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data)
    case 'plain':
      return plain(data)
    case 'json':
      return json(data)
    default:
      throw new Error(`This format: ${formatName} is not exist!`)
  }
}
