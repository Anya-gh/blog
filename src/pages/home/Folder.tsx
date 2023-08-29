import Post from './Post'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import folder from '../../assets/images/folder.svg'
import dropdown from '../../assets/images/dropdown.svg'
import { nestedPostType } from './List'
import circle from '../../assets/images/circle.svg'

type FolderProps = nestedPostType & {
  nestedPosts: nestedPostType[]
}

export default function Folder( {title, id, description, date, category, status, nestedPosts} : FolderProps ) {

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
      <div className='border-2 rounded-lg border-zinc-800 mb-2 bg-zinc-700 w-80 p-2 md:w-[35rem] lg:w-[50rem] flex flex-col'>
        <div className='flex flex-col mb-1'>
            <div className='flex flex-row justify-between'>
              <span className='flex flex-row items-baseline'><img src={folder} alt='folder' className='h-4 mr-2'/><h1 className='font-bold text-xl'>{title}</h1></span>
              <span className='flex flex-row items-center'><h1 className={'tracking-widest ml-3 mr-2 ' + color}>{status}</h1><button onClick={(() => setShowPosts(state => !state))}><img src={dropdown} alt='dropdown' className={'h-4 mr-2 transition duration-200 ' + (showPosts ? '' : ' rotate-180')}/></button></span>
            </div>
            <span className='flex flex-row items-center tracking-widest text-gray-500'><p>{date}</p><img src={circle} className='h-1 mx-5' alt='circle'/><p>{category}</p></span>
        </div>
        <p className='text-left mb-2 text-slate-400'>{description}</p>
        <div className='overflow-hidden'>
          <AnimatePresence>
          {showPosts && 
            <motion.ul className="list-none" initial={{opacity: 0, y: "-100%", height: 0}} animate={{opacity: 1, transition: {duration: 0.2}, y: 0, height: "auto"}} exit={{opacity: 0, transition: {duration: 0.2}, y: "-100%", height: 0}}>
              {nestedPosts.map(post => {
                return (<Post title={post.title} id={`${id}/${post.id}`} description={post.description} status={post.status} category={post.category} date={post.date} nested={true}/>)
              })}
            </motion.ul>
          }
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
