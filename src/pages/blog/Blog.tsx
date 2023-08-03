import { SetStateAction, useEffect, useState, Dispatch } from "react"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import logo from '../../assets/images/logo_shadow_transparent.png'
import menu from '../../assets/images/icons8-menu-50.png'
import home from '../../assets/images/icons8-home-24.png'
import './markdown.css'
import Modal from "./Modal"

interface BlogProps {
  id: string
}


export default function Blog( {id} : BlogProps) {

  const [content, setContent] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

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

  return (
    <>
    {modalOpen && <Modal setModalOpen={setModalOpen}><TableOfContents markdownContent={content}/></Modal>}
    <Menu setModalOpen={setModalOpen}/>
    <div className='flex flex-row w-screen'>
      <div className="markdown-container ml-2 mt-2 p-5"><ReactMarkdown>{content}</ReactMarkdown></div>
    </div>
    <a target="_blank" href="https://icons8.com/icon/84005/home">Home</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    <a target="_blank" href="https://icons8.com/icon/3096/menu">Menu</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </>
  )
}

interface MenuProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

function Menu( {setModalOpen} : MenuProps ) {

  const navigate = useNavigate()
  const onClickHome = () => { navigate('/') }
  const onClickMenu = () => { setModalOpen(true)}

  return (
    <>
      <div className='border-r-2 border-l-2 border-b-2 border-zinc-900 bg-darkmetal w-screen h-10 text-sm sticky top-0 right-0 flex flex-row justify-between items-center p-2'>
        <span className="flex flex-row invert">
          <button onClick={onClickHome}><img alt='home' src={home} className='h-8 w-auto mr-2'/></button>
          <button onClick={onClickMenu}><img alt='menu' src={menu} className='h-8 w-auto'/></button>
        </span>
        <span><img alt='logo' src={logo} className='h-8 w-auto'/></span>
      </div>
    </>
  )
}

interface ToCProps { markdownContent: string}

function TableOfContents( {markdownContent} : ToCProps) {

  const getHeadings = (markdownContent: string) => {
    const headingPattern = /^#{1,6}\s(.+)/gm
    const headings = markdownContent.match(headingPattern)

    const hashToIndex = (content:string) => {
      return (content.match(/#/g) || []).length
    }

    if (headings) {
      return headings.map(heading => [hashToIndex(heading.substring(0, heading.indexOf(' ')+1)), heading.substring(heading.indexOf(' ')+1)])
    }
    return []
  }
  const headings = getHeadings(markdownContent)
  

  return (
    <>
    {headings.map(([index, title]) => {
      console.log(title)
      const Tag = `h${index}` as keyof JSX.IntrinsicElements;
      return (<Tag>{title}</Tag>)
    })}
    </>
  )
}
