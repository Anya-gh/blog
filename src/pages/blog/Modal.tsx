import { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import close from '../../assets/images/close_icon.svg'
import TableOfContents from './TableOfContents'

interface Props {
  setTableOpen: Dispatch<SetStateAction<boolean>>,
  markdownRef: React.RefObject<HTMLDivElement>
}

export default function Modal( {setTableOpen, markdownRef} : Props ) {
  return (
    <motion.div className='h-screen w-screen bg-darkmetal bg-opacity-80 fixed'
    exit={{opacity: 0, transition: {duration: 0.2}}} initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.2}}}>
      <div className='bg-zinc-800 mt-20 mr-10 ml-10 mb-5 p-3 text-sm flex flex-row justify-between items-start'>
        <TableOfContents markdownRef={markdownRef} setTableOpen={setTableOpen} />
        <button onClick={() => setTableOpen(false)}><img className='border-2 border-zinc-900 bg-zinc-800 opacity-80 p-2 ml-2 mr-5 transition duration-200 md:hover:brightness-125 h-10' src={close} alt='close' /></button>
      </div>
    </motion.div>
  )
}