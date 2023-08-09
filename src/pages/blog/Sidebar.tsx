import { SetStateAction, Dispatch } from "react"
import TableOfContents from "./TableOfContents"
import { motion } from "framer-motion"

interface Props {
  markdownRef: React.RefObject<HTMLDivElement>,
  setTableOpen: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar( {markdownRef, setTableOpen} : Props) {
  return (
    <motion.div className="h-screen p-4" initial={{opacity: 0, x: "100%"}} animate={{opacity: 1, x: 0, transition: {duration: 0.2}}} exit={{opacity: 0, x: "100%", transition: {duration: 0.2}}}>
      <div className='border-4 border-zinc-800 pl-1 pt-2 pr-2 pb-2 rounded-xl h-full'>
        <TableOfContents markdownRef={markdownRef} setTableOpen={setTableOpen}/>
      </div>
    </motion.div>
  )
}