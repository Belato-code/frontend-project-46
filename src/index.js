import genDiff from './gendiff.js'
import parse from './parsers.js'
import path from 'node:path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { cwd } from 'node:process'
import formater from './formaters/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const makePath = fileName => path.resolve(cwd(), fileName)

const getDiff = (path1, path2, format = 'stylish') => {
  const extention = filePath => path.extname(filePath)
  const file1 = parse(fs.readFileSync(makePath(path1), 'utf-8'), extention(path1))
  const file2 = parse(fs.readFileSync(makePath(path2), 'utf-8'), extention(path2))
  const diffData = genDiff(file1, file2)

  return formater(format, diffData)
}

export default getDiff
