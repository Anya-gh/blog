import List from "./List"
import { motion } from "framer-motion"
import Categories from "./Categories"
import Icons from "./Icons"
import { useState } from "react"
import title from '../../assets/images/Title.svg'

export default function Home() {

  const [activeCategory, setActiveCategory] = useState('all')
  return (
    <>
      <motion.div className='h-screen w-screen flex flex-col items-center' initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}}>
        <div className='w-80 md:w-[35rem] lg:w-[50rem] mt-10 flex flex-col items-center'>
          <img src={title} alt='title' />
          <p className='tracking-[0.2rem] text-gray-400 mt-7 font-light'>Currently showing {activeCategory}. Filter by skill or technology.</p>
          <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
          <List activeCategory={activeCategory}/>
        </div>
        <Icons />
        <p className='pb-10 text-sm tracking-widest text-slate-500 text-center w-80 md:w-full'>Created by me! You can have a look on GitHub <a href="https://github.com/Anya-gh/blog" className='text-slate-300'>here</a>.</p>
      </motion.div>
    </>
  )
}
