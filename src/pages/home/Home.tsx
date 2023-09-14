import List from "./List"
import { motion } from "framer-motion"
import Categories from "./Categories"
import { useState } from "react"
import title from '../../assets/icons/Title.svg'
import Footer from "../../components/Footer"

export default function Home() {

  const [activeCategory, setActiveCategory] = useState('All')
  return (
    <>
      <motion.div className='h-screen w-screen flex flex-col items-center' initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}}>
        <div className='w-80 md:w-[35rem] lg:w-[50rem] mt-10 flex flex-col items-center'>
          <img src={title} alt='title' />
          <motion.p key={activeCategory} initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.5}}} exit={{opacity: 0, transition: {duration: 0.5}}} className='tracking-[0.2rem] text-gray-400 mt-7 font-light'>Currently showing {activeCategory.toLowerCase()}. Filter by skill or technology.</motion.p>
          <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
          <List activeCategory={activeCategory}/>
        </div>
        <Footer />
      </motion.div>
    </>
  )
}
