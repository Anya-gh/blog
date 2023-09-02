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
  theme? : string
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
  theme: string | undefined,
}

const newJsonData: Post[] = []

const getJsonData = (filePath: string) => {
  let metaData: Post = {title: '', id: '', description: '', status: '', date: '', category: '', theme: undefined}
  const data = fs.readFileSync(filePath, 'utf8')
  const {title, date, description, status, category, theme} = parseMarkdownWithYamlFrontmatter<MarkdownFrontmatter>(data)
  if (title && date && description && status && category) {
    metaData = {title: title, id: title.replaceAll(' ', '-').toLowerCase(), description: description, status: status, date: date, category: category, theme: theme} 
  }
  else {
    throw new InvalidMetadata('Metadata is missing fields: ' + (!title ? 'title; ' : '') + (!date ? 'date; ' : '') + (!description ? 'description; ' : '') + (!status ? 'status; ' : '') + (!category ? 'category; ' : '') + 'in ' + filePath + '.')
  }
  return metaData
}

const generateJsonData = (folderPath:string) => {
  fs.readdirSync(folderPath).forEach(fileName => {
    const filePath = `${folderPath}/${fileName}`
    if (fs.lstatSync(filePath).isDirectory()) {
      const nested: Metadata[] = []
      let metaData: Post = {title: fileName, id: fileName.replaceAll(' ', '-').toLowerCase(), description: '', status: '', date: '', category: '', theme: undefined, nestedPosts: nested}
      const jsonFilePath = `${filePath}/${fileName}.json`
      if (fs.existsSync(jsonFilePath)) {
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8')) as Metadata
        metaData = {title: data.title, id: data.title.replaceAll(' ', '-').toLowerCase(), description: data.description, status: data.status, date: data.date, category: data.category, theme: data.theme, nestedPosts: nested}
        }
      else {
        throw new InvalidFileType(`Folder without JSON file found at ${filePath}. Please create a JSON file named ${fileName}.json for this folder.`)
      }
      fs.readdirSync(filePath).forEach(nestedFileName => {
        const nestedFilePath = `${filePath}/${nestedFileName}`
        if (fs.lstatSync(nestedFilePath).isDirectory()) {
          throw new InvalidFileType('Nested folder found. Files should only be nested up to one level.')
        } 
        else if (path.extname(nestedFileName) === '.md') {
          const fileMetaData = getJsonData(nestedFilePath)
          fileMetaData.theme = metaData.theme
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
  const watcher = chokidar.watch('./posts',
  { persistent: true,
    ignoreInitial: true,
  });

  watcher.on('change', (path) => {
    console.log('What did you do...')
    if (path !== `posts/posts.json` && path !== 'posts/newPosts.json') {
      console.log(`Detected change at ${path}!`)
      generateJsonData('./posts')
      fs.writeFileSync(`./posts/posts.json`, JSON.stringify(newJsonData))
    }
  });
  watcher.on('error', error => {console.error(error)})
}
else {
  generateJsonData('./posts')
  fs.writeFileSync(`./posts/posts.json`, JSON.stringify(newJsonData))
}




