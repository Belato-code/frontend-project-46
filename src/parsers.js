import fs from 'fs'
import path from 'path'
import { cwd } from 'process'
import yaml from 'js-yaml'

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.load,
  '.yml': yaml.load,
}
const makePath = fileName => path.resolve(cwd(), fileName)
export default function makeParse(fileName) {
  const extention = path.extname(fileName)
  if (Object.hasOwn(parsers, extention)) {
    return parsers[extention](fs.readFileSync(makePath(fileName), 'utf-8'))
  }
  else {
    throw new Error(`File extention ${extention} is not supported!`)
  }
}
