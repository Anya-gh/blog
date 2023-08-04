import { useEffect, useState, useRef } from "react"
import ReactMarkdown from 'react-markdown'
import Menu from "./Menu"
import './markdown.css'
import Modal from "./Modal"
import { AnimatePresence } from "framer-motion"

interface BlogProps {
  id: string
}

export default function Blog( {id} : BlogProps) {

  const [content, setContent] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const markdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
    children: React.ReactNode
  }

  return (
    <>
    <AnimatePresence>{modalOpen && <Modal setModalOpen={setModalOpen} markdownRef={markdownRef}></Modal>}</AnimatePresence>
    <Menu setModalOpen={setModalOpen}/>
    <div className="markdown-container ml-2 mt-2 p-5" ref={markdownRef}>
      <ReactMarkdown children={content} components={{
        h2: ( props : HeadingProps ) => {
          const heading = Array.isArray(props.children) ? props.children[0] : props.children
          if (isString(heading)) {
            const slug = generateSlug(heading)
            return <h2 id={slug}>{heading}</h2>
          }
          return <h2>{props.children}</h2>
        }
      }}/>
    </div>
    <a target="_blank" href="https://icons8.com/icon/84005/home">Home</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    <a target="_blank" href="https://icons8.com/icon/3096/menu">Menu</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </>
  )
}
