import { SetStateAction, Dispatch } from "react"
import TableOfContents from "./TableOfContents"
import { motion } from "framer-motion"

interface Props {
  markdownRef: React.RefObject<HTMLDivElement>,
  setTableOpen: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar( {markdownRef, setTableOpen} : Props) {
  return (
    <motion.div initial={{opacity: 0, x: "100%"}} animate={{opacity: 1, x: 0, transition: {duration: 0.2}}} exit={{opacity: 0, x: "100%", transition: {duration: 0.2}}}>
      <TableOfContents markdownRef={markdownRef} setTableOpen={setTableOpen}/>
    </motion.div>
  )
}
