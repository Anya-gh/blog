import * as fs from 'fs'
import path from 'path'
import { parseMarkdownWithYamlFrontmatter } from './pages/blog/FrontMatterParser.tsx';
import * as chokidar from 'chokidar'

class InvalidFileType extends Error {
  constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, InvalidFileType.prototype);
  }
}

class InvalidMetadata extends Error {
  constructor (message: string) {
    super(message)

    Object.setPrototypeOf(this, InvalidMetadata.prototype)
  }
}

type MarkdownFrontmatter = {
  title?: string,
  date?: string,
  description?: string,
  category? : string,
  status? : string
}

type Post = Metadata & {
  nestedPosts?: Metadata[]
}

type Metadata = {
  title: string,
  id: string,
  date: string,
  description: string,
  category : string,
  status : string,
}

const newJsonData: Post[] = []

const getJsonData = (filePath: string) => {
  let metaData: Post = {title: '', id: '', description: '', status: '', date: '', category: ''}
  const data = fs.readFileSync(filePath, 'utf8')
  const {title, date, description, status, category} = parseMarkdownWithYamlFrontmatter<MarkdownFrontmatter>(data)
  if (title && date && description && status && category) {
    metaData = {title: title, id: title.replaceAll(' ', '-').toLowerCase(), description: description, status: status, date: date, category: category} 
  }
  else {
    throw new InvalidMetadata('Metadata is missing fields: ' + (!title && ' title;') + (!date && ' date;') + (!description && ' description;') + (!status && ' status;') + (!category && ' category;') + ' in ' + filePath + '.')
  }
  return metaData
}

const generateJsonData = (folderPath:string) => {
  fs.readdirSync(folderPath).forEach(fileName => {
    const filePath = `${folderPath}/${fileName}`
    if (fs.lstatSync(filePath).isDirectory()) {
      const nested: Metadata[] = []
      let metaData = {title: fileName, id: fileName.replaceAll(' ', '-').toLowerCase(), description: '', status: '', date: '', category: '', nestedPosts: nested}
      fs.readdirSync(filePath).forEach(nestedFileName => {
        const nestedFilePath = `${filePath}/${nestedFileName}`
        if (fs.lstatSync(nestedFilePath).isDirectory()) {
          throw new InvalidFileType('Nested folder found. Files should only be nested up to one level.')
        }
        if (path.extname(nestedFileName) === '.json') {
          const data = JSON.parse(fs.readFileSync(nestedFilePath, 'utf-8')) as Metadata
          metaData = {title: data.title, id: data.title.replaceAll(' ', '-').toLowerCase(), description: data.description, status: data.status, date: data.date, category: data.category, nestedPosts: nested}
        }
        else if (path.extname(nestedFileName) === '.md') {
          const fileMetaData = getJsonData(nestedFilePath)
          nested.push(fileMetaData)
        }
      })
      newJsonData.push(metaData)
    }
    else if (path.extname(filePath) === '.md') {
      const metaData = getJsonData(filePath)
      newJsonData.push(metaData)
    }
    else if (path.extname(filePath) !== '.json') {
      throw new InvalidFileType('Unexpected file type found: ' + path.extname(filePath))
    }
  })
}



if (process.argv[2] && process.argv[2] === '-w') {
  const watcher = chokidar.watch('./posts', {
    ignoreInitial: true
  });

  watcher.on('change', (path) => {
    if (path !== `posts/posts.json` && path !== 'posts/newPosts.json') {
      console.log(`Detected change at ${path}!`)
      generateJsonData('./posts')
      fs.writeFileSync(`./posts/posts.json`, JSON.stringify(newJsonData))
    }
  });
}
else {
  generateJsonData('./posts')
  fs.writeFileSync(`./posts/posts.json`, JSON.stringify(newJsonData))
}




