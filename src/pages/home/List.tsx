import { useNavigate } from "react-router-dom"
import * as postsJSON from '../../posts/posts.json'

export default function List() {

  const posts = postsJSON["posts"]
  console.log(posts)

  return (
    <>
    <div>
      <ul className="list-none mb-10">
        {posts.map(post => {
           return (<ListElement title={post.title} id={post.id} description={post.description} progress={post.progress}/>)
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
  progress: number
}

const ListElement = ({title, id, description, progress} : ListElementProps) => {

  const navigate = useNavigate();

  const onClickHandler = (link:string) => {
    navigate(link)
  }

  return (
    
    <li>
      <button onClick={(() => onClickHandler(id))} className='border-2 rounded-lg border-zinc-800 w-80 p-2 md:w-[35rem] lg:w-[50rem] flex flex-row justify-between mb-2'>
        <div className='flex flex-col items-start'>
          <h1 className='font-bold text-xl'>{title}</h1>
          <p>{description}</p>
        </div>
        <h1>{`${progress}%`}</h1>
      </button>
    </li>
  )
}
