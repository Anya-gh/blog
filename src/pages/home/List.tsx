import { useNavigate } from "react-router-dom"
import * as postsJSON from '../../posts/posts.json'
import { useEffect, useState } from "react"

export default function List() {

  const posts = postsJSON["posts"]
  console.log(posts)

  return (
    <>
    <div>
      <ul className="list-none mb-10">
        {posts.map(post => {
           return (<ListElement title={post.title} id={post.id} description={post.description} status={post.status}/>)
        })}
      </ul>
    </div>
    </>
  )
}

interface ListElementProps {
  title: string,
  id: string,
  description: string,
  status: string
}

const ListElement = ({title, id, description, status} : ListElementProps) => {

  const navigate = useNavigate();

  const [color, setColor] = useState('')

  const onClickHandler = (link:string) => {
    navigate(link)
  }

  useEffect(() => {
    switch(status) {
      case "IN PROGRESS": 
        setColor('text-sky-400')
        break;
      case "PLANNED":
        setColor('text-slate-400')
        break;
      case "COMPLETE":
        setColor('text-emerald-400')
        break;
    }
  }, [])

  return (
    
    <li>
      <button onClick={(() => onClickHandler(id))} className='border-2 rounded-lg border-zinc-800 w-80 p-2 md:w-[35rem] lg:w-[50rem] flex flex-row justify-between mb-2 items-center'>
        <div className='flex flex-col items-start'>
          <h1 className='font-bold text-xl'>{title}</h1>
          <p className='text-left'>{description}</p>
        </div>
        <h1 className={'tracking-widest ml-3 ' + color}>{status}</h1>
      </button>
    </li>
  )
}
