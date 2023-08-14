import { PostProps } from './Post'
import Post from './Post'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import folder from '../../assets/images/folder.svg'
import dropdown from '../../assets/images/dropdown.svg'

interface FolderProps {
  title: string,
  id: string,
  description: string,
  status: string,
  nestedPosts: PostProps[]
}

export default function Folder( {title, id, description, status, nestedPosts} : FolderProps ) {

  const [showPosts, setShowPosts] = useState(false)
  const [color, setColor] = useState('')

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
    <>
    <li>
      <div className='border-2 rounded-lg border-zinc-800 bg-zinc-700 w-80 p-2 md:w-[35rem] lg:w-[50rem] flex flex-col'>
        <div className='flex flex-row justify-between'>
          <span className='flex flex-row items-baseline'>{nestedPosts.length > 0 && <img src={folder} alt='folder' className='h-4 mr-2'/>}<h1 className='font-bold text-xl'>{title}</h1></span>
          <span className='flex flex-row items-center'><h1 className={'tracking-widest ml-3 mr-2 ' + color}>{status}</h1><button onClick={(() => setShowPosts(state => !state))}><img src={dropdown} alt='dropdown' className={'h-4 mr-2 transition duration-200 ' + (showPosts ? '' : ' rotate-180')}/></button></span>
        </div>
        <p className='text-left mb-2'>{description}</p>
        <div className='overflow-hidden'>
          <AnimatePresence>
          {showPosts && 
            <motion.ul className="list-none" initial={{opacity: 0, y: "-100%"}} animate={{opacity: 1, transition: {duration: 0.2}, y: 0}} exit={{opacity: 0, transition: {duration: 0.2}, y: "-100%"}}>
              {nestedPosts.map(post => {
                return (<Post title={post.title} id={`${id}/${post.id}`} description={post.description} status={post.status} nested={true}/>)
              })}
            </motion.ul>
          }
          </AnimatePresence>
        </div>
      </div>
    </li>
    </>
  )
}
