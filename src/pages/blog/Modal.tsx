import { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  markdownRef: React.RefObject<HTMLDivElement>
}

export default function Modal( {setModalOpen, markdownRef} : Props ) {
  return (
    <motion.div className='h-screen w-screen bg-darkmetal bg-opacity-80 fixed'
    exit={{opacity: 0, transition: {duration: 0.2}}} initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.2}}}>
      <div className='bg-zinc-800 mt-20 mr-10 ml-10 mb-5 p-3 text-sm flex flex-row justify-between'>
        <ul className='list-disc ml-3'><TableOfContents markdownRef={markdownRef} setModalOpen={setModalOpen} /></ul>
        <button onClick={() => setModalOpen(modal => !modal)} className='border-2 h-10 border-zinc-900 bg-zinc-800 opacity-80 p-2 ml-2 transition duration-200 md:hover:brightness-125'>Close</button>
      </div>
    </motion.div>
  )
}

interface ToCProps { 
  markdownRef: React.RefObject<HTMLDivElement>,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

function TableOfContents( {markdownRef, setModalOpen} : ToCProps) {
  
  const headings = markdownRef.current?.querySelectorAll("h2, h3, h4")
  if (headings) {
    const headingsArray = Array.from(headings)
    return (
      <>
        {headingsArray.map(heading => {
          return <li className='transition duration-200 lg:hover:text-blue-500' key={heading.id}><a onClick={() => {setModalOpen(false)}} href={`#${heading.id}`}>{heading.innerHTML}</a></li>
        })}
      </>
      
    )
  }
  return (<></>)
}