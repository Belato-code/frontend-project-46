import yaml from 'js-yaml'

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
}

export default function parse(data, extention) {
  if (Object.hasOwn(parsers, extention)) {
    return parsers[extention](data)
  }
  else {
    throw new Error(`File extention ${extention} is not supported!`)
  }
}
