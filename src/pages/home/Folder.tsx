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
    <div className='border-2 rounded-lg border-zinc-800 w-80 p-2 md:w-[35rem] lg:w-[50rem] flex flex-row justify-between mb-2 items-center'>
      <div className='flex flex-col items-start'>
        <span className='flex flex-row justify-between w-full'><span className='flex flex-row items-baseline'>{nestedPosts.length > 0 && <img src={folder} alt='folder' className='h-4 mr-2'/>}
        <h1 className='font-bold text-xl'>{title}</h1></span>
        <button onClick={(() => setShowPosts(state => !state))}><img src={dropdown} alt='dropdown' className={'h-4 mr-2 transition duration-200 ' + (showPosts ? '' : ' rotate-180')}/></button></span>
        <p className='text-left'>{description}</p>
      </div>
      <h1 className={'tracking-widest ml-3 ' + color}>{status}</h1>
    </div>
    <AnimatePresence>
      {showPosts && 
        <motion.ul className="mb-10 list-none" initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.2}}} exit={{opacity: 0, transition: {duration: 0.2}}}>
          {nestedPosts.map(post => {
            return (<Post title={post.title} id={`${id}/${post.id}`} description={post.description} status={post.status}/>)
          })}
        </motion.ul>
      }
      </AnimatePresence>
    </>
  )
}
