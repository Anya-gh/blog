import { SetStateAction, Dispatch } from "react"
import TableOfContents from "./TableOfContents"
import { motion } from "framer-motion"

interface Props {
  markdownRef: React.RefObject<HTMLDivElement>,
  setTableOpen: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar( {markdownRef, setTableOpen} : Props) {
  return (
    <motion.div className="p-4 h-full sticky top-44 bg-darkmetal" initial={{opacity: 0, x: "100%"}} animate={{opacity: 1, x: 0, transition: {duration: 0.2}}} exit={{opacity: 0, x: "100%", transition: {duration: 0.2}}}>
      <div className='opacity-70 pl-1 pr-6 w-60 h-full break-words hyphens-auto flex flex-col justify-between'>
        <TableOfContents markdownRef={markdownRef} setTableOpen={setTableOpen}/>
      </div>
    </motion.div>
  )
}
