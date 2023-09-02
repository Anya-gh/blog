import { useEffect, useState, useRef } from "react"
import ReactMarkdown from 'react-markdown'
//import Menu from "./Menu"
import Modal from "./Modal"
import { AnimatePresence, motion } from "framer-motion"
import Sidebar from "./Sidebar"
import  { parseMarkdownWithYamlFrontmatter } from './FrontMatterParser'
import Banner from "./Banner"

interface BlogProps {
  id: string
}

type MarkdownFrontmatter = {
  title?: string,
  date?: string,
  description?: string,
  category? : string,
  theme? : string
}

export default function Blog( {id} : BlogProps) {

  const [content, setContent] = useState('')
  const [data, setData] = useState<MarkdownFrontmatter>({})
  const [tableOpen, setTableOpen] = useState(false)
  const markdownRef = useRef<HTMLDivElement>(null)
  const [largeScreen, setLargeScreen] = useState(window.matchMedia("(min-width: 1024px)").matches)


  useEffect(() => {
    window
    .matchMedia("(min-width: 1024px)")
    .addEventListener('change', e => setLargeScreen( e.matches ));
    const path = `../../posts/${id}.md`
    import(path /* @vite-ignore */)
    .then(res => res.default)
    .then(res => {
      const {content, ...frontmatter} = parseMarkdownWithYamlFrontmatter<MarkdownFrontmatter>(res)
      setContent(content)
      setData(frontmatter)
      console.log(frontmatter)
    })
    .catch(error => console.error("Error loading markdown file: ", error))
  }, [])

  const generateSlug = (content:string) => {
    let str = content.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  };

  function isString(value: React.ReactNode): value is string {
    return typeof value === 'string'
  }

  type HeadingProps = ElementProps & {
    level: number
  }

  type ElementProps = {
    children: React.ReactNode
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}} className="flex flex-col items-center">
      <div className='flex flex-col items-center h-screen w-80 lg:w-[60rem] mx-10'>
        {/*<Menu setTableOpen={setTableOpen} largeScreen={largeScreen}/>*/}
        {data.title && data.date && <Banner title={data.title} date={data.date} theme={data.theme} setTableOpen={setTableOpen}/>}
        {!largeScreen && <AnimatePresence>{tableOpen && <Modal setTableOpen={setTableOpen} markdownRef={markdownRef}></Modal>}</AnimatePresence>}
        <div className="flex flex-row h-screen overflow-scroll scroll-smooth mb-10">
          <div className="ml-2" ref={markdownRef}>
            <ReactMarkdown className='' children={content} components={{
              h1: ( props : HeadingProps ) => {
                const heading = Array.isArray(props.children) ? props.children[0] : props.children
                if (isString(heading)) {
                  const slug = generateSlug(heading)
                  return <h1 className='text-4xl lg:text-5xl font-bold mb-5 pt-3 text-center' id={slug}>{props.children}</h1>
                }
                return <h1>{props.children}</h1>
              },
              h2: ( props : HeadingProps ) => {
                const heading = Array.isArray(props.children) ? props.children[0] : props.children
                if (isString(heading)) {
                  const slug = generateSlug(heading)
                  return <h2 className='text-2xl lg:text-3xl font-bold my-2 pt-3 border-b-4 border-zinc-800' id={slug}>{props.children}</h2>
                }
                return <h2>{props.children}</h2>
              },
              h3: ( props : HeadingProps ) => {
                const heading = Array.isArray(props.children) ? props.children[0] : props.children
                if (isString(heading)) {
                  const slug = generateSlug(heading)
                  return <h3 className='text-xl font-bold mt-3' id={slug}>{props.children}</h3>
                }
                return <h3>{props.children}</h3>
              },
              p: ( props: ElementProps ) => {
                  return <p className="leading-relaxed text-gray-400 font-light tracking-wider">{props.children}</p>
              },
              ul: ( props: ElementProps ) => {
                return <ul className="list-inside list-image-dash my-2">{props.children}</ul>
              },
              ol: ( props: ElementProps ) => {
                return <ol className='list-inside list-decimal marker:text-white my-2'>{props.children}</ol>
              },
              li: ( props: ElementProps ) => {
                  return <li className="leading-relaxed text-gray-400 font-light tracking-wider ml-5">{props.children}</li>
              }
            }}/>
          </div>
          {largeScreen && <AnimatePresence mode='wait'>{tableOpen &&<Sidebar markdownRef={markdownRef} setTableOpen={setTableOpen}/>}</AnimatePresence>}
        </div>
      </div>
    </motion.div>
  )
}
