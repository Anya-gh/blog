import { useNavigate } from "react-router-dom"
import * as postsJSON from '../../posts/posts.json'
import { useEffect, useState } from "react"
import folder from '../../assets/images/folder.svg'
import { AnimatePresence, motion } from "framer-motion"

export default function List() {

  const posts = postsJSON["posts"]
  console.log(posts)

  return (
    <>
    <div>
      <ul className="list-none mb-10">
        {posts.map(post => {
           return (<ListElement title={post.title} id={post.id} description={post.description} status={post.status} nestedPosts={post.nestedPosts}/>)
        })}
      </ul>
    </div>
    </>
  )
}

type Post = {
  title: string,
  id: string,
  description: string,
  status: string,
  nestedPosts: Post[]
}

const ListElement = ({title, id, description, status, nestedPosts} : Post) => {

  const navigate = useNavigate();

  const [color, setColor] = useState('')
  const [showPosts, setShowPosts] = useState(false)

  const onClickHandler = (link:string) => {
    nestedPosts.length > 0 ? setShowPosts(posts => !posts) : navigate(link)
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
          <span className='flex flex-row items-baseline'>{nestedPosts.length > 0 && <img src={folder} alt='folder' className='h-4 mr-2'/>}
          <h1 className='font-bold text-xl'>{title}</h1></span>
          <p className='text-left'>{description}</p>
        </div>
        <h1 className={'tracking-widest ml-3 ' + color}>{status}</h1>
      </button>
      <AnimatePresence>
      {showPosts && 
        <motion.ul className="list-none mb-10" initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.2}}} exit={{opacity: 0, transition: {duration: 0.2}}}>
          {nestedPosts.map(post => {
            return (<ListElement title={post.title} id={post.id} description={post.description} status={post.status} nestedPosts={post.nestedPosts}/>)
          })}
        </motion.ul>
      }
      </AnimatePresence>
    </li>
  )
}
