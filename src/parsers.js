import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { makePath } from './index.js'

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
}

export default function makeParse(fileName) {
  const extention = path.extname(fileName)
  if (Object.hasOwn(parsers, extention)) {
    return parsers[extention](fs.readFileSync(makePath(fileName), 'utf-8'))
  }
  else {
    throw new Error(`File extention ${extention} is not supported!`)
  }
}
