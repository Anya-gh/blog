import { useEffect, useState, useRef } from "react"
import ReactMarkdown from 'react-markdown'
import Menu from "./Menu"
import './markdown.css'
import Modal from "./Modal"
import { AnimatePresence, motion } from "framer-motion"
import Sidebar from "./Sidebar"

interface BlogProps {
  id: string
}

export default function Blog( {id} : BlogProps) {

  const [content, setContent] = useState('')
  const [tableOpen, setTableOpen] = useState(false)
  const markdownRef = useRef<HTMLDivElement>(null)
  const [largeScreen, setLargeScreen] = useState(window.matchMedia("(min-width: 1024px)").matches)


  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setLargeScreen( e.matches ));
    import(`../../posts/${id}.md`)
    /*.then(res => {
        console.log(res)
        setContent(res.default)
    }*/
    .then(res => res.default)
    .then(res => {
      setContent(res)
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

  interface HeadingProps {
    children: React.ReactNode,
    level: number
  }

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}}
    className='flex flex-col lg:flex-row'>
      <Menu setTableOpen={setTableOpen}/>
      {!largeScreen && <AnimatePresence>{tableOpen && <Modal setTableOpen={setTableOpen} markdownRef={markdownRef}></Modal>}</AnimatePresence>}
      <div className="markdown-container ml-2 mt-2 p-5 overflow-scroll" ref={markdownRef}>
        <ReactMarkdown children={content} components={{
          h2: ( props : HeadingProps ) => {
            const heading = Array.isArray(props.children) ? props.children[0] : props.children
            if (isString(heading)) {
              const slug = generateSlug(heading)
              return <h2 className='pt-3 underline' id={slug}>{heading}</h2>
            }
            return <h2>{props.children}</h2>
          },
          h3: ( props : HeadingProps ) => {
            const heading = Array.isArray(props.children) ? props.children[0] : props.children
            if (isString(heading)) {
              const slug = generateSlug(heading)
              return <h3 className='mt-3' id={slug}>{heading}</h3>
            }
            return <h3 className='mt-3'>{props.children}</h3>
          }
        }}/>
      </div>
      {largeScreen && <AnimatePresence>{tableOpen && <Sidebar markdownRef={markdownRef} setTableOpen={setTableOpen}/>}</AnimatePresence>}
    </motion.div>
  )
}
