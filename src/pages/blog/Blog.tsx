import { useEffect, useState, useRef } from "react"
import { files } from "../../components/Files"
import ReactMarkdown from 'react-markdown'
//import Menu from "./Menu"
import Modal from "./Modal"
import { AnimatePresence, motion } from "framer-motion"
import Sidebar from "./Sidebar"
import  { parseMarkdownWithYamlFrontmatter } from './FrontMatterParser'
import Banner from "./Banner"
import Footer from "../../components/Footer"
import { Slug } from "../../components/Slug"

interface BlogProps {
  id: string
}

type MarkdownFrontmatter = {
  title?: string,
  date?: string,
  description?: string,
  category?: string,
  theme?: string,
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
    /*
    const path = `../../assets/posts/${id}.md`
    import(path @vite-ignore)
    .then(res => res.default)
    .then(res => {
      const {content, ...frontmatter} = parseMarkdownWithYamlFrontmatter<MarkdownFrontmatter>(res)
      setContent(content)
      setData(frontmatter)
    })
    .catch(error => console.error("Error loading markdown file: ", error)) */
    const file = files[id] 
    const {content, ...frontmatter} = parseMarkdownWithYamlFrontmatter<MarkdownFrontmatter>(file)
    setContent(content)
    setData(frontmatter)
  }, [])

  function isString(value: React.ReactNode): value is string {
    return typeof value === 'string'
  }

  type HeadingProps = ElementProps & {
    level: number
  }

  type ElementProps = {
    children: React.ReactNode
  }

  type AnchorProps = ElementProps & {
    href?: string | undefined
  }

  type ImgProps = ElementProps & {
    src?: string | undefined
    alt?: string | undefined
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}} className="flex flex-col items-center">
      <div className='flex flex-col items-center w-80 md:w-[40rem] lg:w-[60rem] mx-10'>
        {/*<Menu setTableOpen={setTableOpen} largeScreen={largeScreen}/>*/}
        {data.title && data.date && <Banner title={data.title} date={data.date} theme={data.theme} setTableOpen={setTableOpen}/>}
        {!largeScreen && <AnimatePresence>{tableOpen && <Modal setTableOpen={setTableOpen} markdownRef={markdownRef}></Modal>}</AnimatePresence>}
        <div className="flex flex-row scroll-smooth mb-10">
          <div className="ml-2" ref={markdownRef}>
            <ReactMarkdown className='' children={content} components={{
              h1: ( props : HeadingProps ) => {
                const heading = Array.isArray(props.children) ? props.children[0] : props.children
                if (isString(heading)) {
                  const slug = Slug(heading)
                  return <h1 className='text-4xl lg:text-5xl font-bold mb-5 pt-3 text-center' id={slug}>{props.children}</h1>
                }
                return <h1>{props.children}</h1>
              },
              h2: ( props : HeadingProps ) => {
                const heading = Array.isArray(props.children) ? props.children[0] : props.children
                if (isString(heading)) {
                  const slug = Slug(heading)
                  return <h2 className='text-2xl lg:text-3xl font-bold my-2 pt-3 border-b-4 border-zinc-800' id={slug}>{props.children}</h2>
                }
                return <h2>{props.children}</h2>
              },
              h3: ( props : HeadingProps ) => {
                const heading = Array.isArray(props.children) ? props.children[0] : props.children
                if (isString(heading)) {
                  const slug = Slug(heading)
                  return <h3 className='text-xl font-bold mt-3' id={slug}>{props.children}</h3>
                }
                return <h3>{props.children}</h3>
              },
              p: ( props: ElementProps ) => {
                  return <p className="leading-relaxed text-gray-300 font-light text-sm tracking-wider">{props.children}</p>
              },
              ul: ( props: ElementProps ) => {
                return <ul className="list-inside list-image-dash my-2">{props.children}</ul>
              },
              ol: ( props: ElementProps ) => {
                return <ol className='list-inside list-decimal marker:text-white my-2'>{props.children}</ol>
              },
              li: ( props: ElementProps ) => {
                  return <li className="leading-relaxed text-gray-300 font-light text-sm tracking-wider ml-5">{props.children}</li>
              },
              a: ( props: AnchorProps ) => {
                return <a href={props.href} className='text-sky-400'>{props.children}</a>
              },
              img: ( props: ImgProps ) => {
                return <img src={`../../src/assets/images/${props.src}`} alt={props.alt ? props.alt : 'alt text'} className='max-h-[30rem] max-w-[18rem] lg:max-w-3xl h-auto w-auto ml-auto mr-auto my-5'/>
              }
            }}/>
          </div>
          {largeScreen && <AnimatePresence mode='wait'>{tableOpen &&<Sidebar markdownRef={markdownRef} setTableOpen={setTableOpen}/>}</AnimatePresence>}
        </div>
        <Footer />
      </div>
    </motion.div>
  )
}
