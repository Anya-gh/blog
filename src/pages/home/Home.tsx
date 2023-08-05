import List from "./List"
import search from '../../assets/images/search.svg'
import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <motion.div className='h-screen w-screen flex flex-col items-center' initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}}>
        <div className='mt-10 flex flex-col mx-10 md:flex-wrap md:w-[35rem] lg:w-[50rem]'>
          <h1 className='mt-40 text-5xl font-bold md:text-8xl lg:text-9xl'>Anya's Blog</h1>
          <p>Learn more about all the projects I've worked on, and what I'm working on right now.</p>
        </div>
        <button className='border-2 rounded-lg border-zinc-800 w-80 my-10 flex flex-row items-end p-2 text-zinc-500 md:w-[35rem] lg:w-[50rem]'>
          <img className="h-4 mr-2 mb-1 opacity-50" src={search} alt='search' />
          <p>Search</p>
        </button>
        <List />
      </motion.div>
    </>
  )
}
