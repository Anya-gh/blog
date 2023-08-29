import List from "./List"
import { motion } from "framer-motion"
import logo from '../../assets/images/logo.svg'
import linebreak from '../../assets/images/linebreak.svg'
import Categories from "./Categories"
import Icons from "./Icons"
import { useState } from "react"

export default function Home() {

  const [activeCategory, setActiveCategory] = useState('all')
  return (
    <>
      <motion.div className='h-screen w-screen flex flex-col items-center' initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}}>
        <div className='w-80 md:w-[35rem] lg:w-[50rem] flex flex-col items-center'>
          <span className='flex flex-row items-center md:w-[35rem] lg:w-[50rem] mt-10'><img src={logo} alt='logo' className='mt-5 h-20 md:h-40 md:mt-10 lg:mt-16 lg:h-auto'/><h1 className='text-5xl font-bold md:text-8xl lg:text-9xl italic'>'s Blog</h1></span>
          <p className='tracking-widest text-center'>Learn more about what I've worked on, and what I'm working on now</p>
          <img src={linebreak} alt='linebreak' className='mt-10 opacity-50 w-full'/>
          <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
          <List activeCategory={activeCategory}/>
        </div>
        <Icons />
        <p className='pb-10 text-sm tracking-widest text-slate-500 text-center w-80 md:w-full'>Created by me! You can have a look on GitHub <a href="https://github.com/Anya-gh/blog" className='text-slate-300'>here</a>.</p>
      </motion.div>
    </>
  )
}
