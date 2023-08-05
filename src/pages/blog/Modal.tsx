import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import close from '../../assets/images/close_icon.svg'
import dropdown from '../../assets/images/dropdown.svg'
import { AnimatePresence } from 'framer-motion'

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  markdownRef: React.RefObject<HTMLDivElement>
}

export default function Modal( {setModalOpen, markdownRef} : Props ) {
  return (
    <motion.div className='h-screen w-screen bg-darkmetal bg-opacity-80 fixed'
    exit={{opacity: 0, transition: {duration: 0.2}}} initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.2}}}>
      <div className='bg-zinc-800 mt-20 mr-10 ml-10 mb-5 p-3 text-sm flex flex-row justify-between items-start'>
        <TableOfContents markdownRef={markdownRef} setModalOpen={setModalOpen} />
        <button onClick={() => setModalOpen(modal => !modal)}><img className='border-2 border-zinc-900 bg-zinc-800 opacity-80 p-2 ml-2 mr-5 transition duration-200 md:hover:brightness-125 h-10' src={close} alt='close' /></button>
      </div>
    </motion.div>
  )
}

interface ToCProps { 
  markdownRef: React.RefObject<HTMLDivElement>,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

type nestedHeadingsArray = {
  title: string,
  id: string,
  nested: nestedHeadingsArray[]
}

function TableOfContents( {markdownRef, setModalOpen} : ToCProps) {
  
  const headings = markdownRef.current?.querySelectorAll<HTMLHeadingElement>("h2, h3, h4")
  const [nestedHeadings, setNestedHeadings] = useState<nestedHeadingsArray[]>([])
  const [openHeadings, setOpenHeadings] = useState<boolean[]>([])

  useEffect(() => {
    const newNestedHeadings:nestedHeadingsArray[] = []
    if (headings) {
      const headingsArray = Array.from(headings)
      headingsArray.forEach(heading => {
        if (heading.tagName === 'H2') { 
          newNestedHeadings.push({title: heading.innerText, id: heading.id, nested: []}) 
        }
        if (heading.tagName === 'H3') {
          newNestedHeadings[newNestedHeadings.length - 1].nested.push({title: heading.innerText, id: heading.id, nested: []})
        }
      })
      setNestedHeadings(newNestedHeadings)
      setOpenHeadings(newNestedHeadings.map(() => { return false }))
    }
  }, [])

  const handleOpenHeading = (index:number) => {
    const items = [...openHeadings]
    const item = items[index]
    items[index] = !item
    setOpenHeadings(items)
  }
    
  return (
    <>
      <ul className='ml-3'>
        {nestedHeadings.map((heading, index) => {
          return (
              <li key={heading.id}>
                <span className='flex flex-row items-baseline justify-start'><span><button className='w-3 h-3 mr-3' onClick={() => handleOpenHeading(index)}><img src={dropdown} alt='dropdown' className={openHeadings[index] ? 'rotate-180 transition-transform duration-200' : 'rotate-90 transition-transform duration-200'}/></button></span><a className={'transition duration-200 lg:hover:text-blue-500 text-lg'} onClick={() => {setModalOpen(false)}} href={`#${heading.id}`}>{heading.title}</a></span>
                <div className='overflow-hidden'>
                <AnimatePresence>{openHeadings[index] && <motion.ul className={'ml-10'} initial={{opacity: 0, y: '-100%'}} animate={{opacity: 1, transition: {duration: 0.3}, y: 0}} exit={{opacity: 0, transition: {duration: 0.3}, y: '-100%'}}>
                  {heading.nested.map(nestedHeading => {
                  return <li key={nestedHeading.id}>
                    <a className={'transition duration-200 lg:hover:text-blue-500 text-base'} onClick={() => {setModalOpen(false)}} href={`#${nestedHeading.id}`}>{nestedHeading.title}</a>
                  </li>
                  })}
                </motion.ul>}</AnimatePresence></div>
              </li>
          )
        })}
      </ul>
    </> 
  )
}