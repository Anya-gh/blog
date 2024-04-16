import Post from './Post'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import folder from '../../assets/icons/folder.svg'
import dropdown from '../../assets/icons/dropdown.svg'
import { nestedPostType } from './List'
import circle from '../../assets/icons/circle.svg'
import { themes } from '../../components/Themes'

type FolderProps = nestedPostType & {
  nestedPosts: nestedPostType[]
}

export default function Folder( {title, id, description, date, category, status, nestedPosts, theme} : FolderProps ) {

  const [showPosts, setShowPosts] = useState(false)
  const [credit, setCredit] = useState<string | undefined>(undefined)
  const [color, setColor] = useState('')
  const [bg, setBg] = useState('')

  useEffect(() => {
    if (theme && themes[theme] !== undefined) {
      setBg(themes[theme].style)
      setCredit(themes[theme].credit)
    }
    else {
      setBg(themes['temp'].style)
      setCredit(themes['temp'].credit)
    }
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
      <div className={`rounded-lg mb-4 w-80 md:w-[35rem] lg:w-[50rem] min-h-[7rem] flex flex-col ${bg}`}>
        <div className='bg-black bg-opacity-50 min-h-[7rem] h-full p-2 rounded-lg'>
          <div className='flex flex-col mb-1'>
              <div className='flex flex-row justify-between'>
                <span className='flex flex-row items-baseline'><img src={folder} alt='folder' className='h-4 mr-2'/><h1 className='font-bold text-xl'>{title}</h1></span>
                <span className='flex flex-row items-center'><h1 className={'tracking-widest ml-3 mr-2 ' + color}>{status}</h1><button onClick={(() => setShowPosts(state => !state))}><img src={dropdown} alt='dropdown' className={'h-4 mr-2 transition duration-200 ' + (showPosts ? '' : ' rotate-180')}/></button></span>
              </div>
              <span className='flex flex-row items-center tracking-widest text-gray-400'><p>{date}</p><img src={circle} className='h-1 mx-5' alt='circle'/><p>{category}</p></span>
          </div>
          <p className='text-left text-gray-300'>{description}</p>
          <div className='mb-2'>
            {credit && <p className='text-left text-sm text-gray-400'>{credit}</p>}
          </div>
          <div className='overflow-hidden'>
            <AnimatePresence>
            {showPosts && 
              <motion.ul className="list-none" initial={{opacity: 0, y: "-100%", height: 0}} animate={{opacity: 1, transition: {duration: 0.2}, y: 0, height: "auto"}} exit={{opacity: 0, transition: {duration: 0.2}, y: "-100%", height: 0}}>
                {nestedPosts.map(post => {
                  return (<Post key={post.title} title={post.title} id={`${id}/${post.id}`} description={post.description} status={post.status} category={post.category} date={post.date} nested={true}/>)
                })}
              </motion.ul>
            }
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}
