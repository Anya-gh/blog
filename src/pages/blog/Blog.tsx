import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import './markdown.css'

interface BlogProps {
  id: string
}


export default function Blog( {id} : BlogProps) {

  const [content, setContent] = useState('')

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
    <div className='flex flex-row w-screen'>
      <div className="markdown-container ml-2 mt-2"><ReactMarkdown>{content}</ReactMarkdown></div>
    </div>
    </>
  )
}
