import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import dropdown from '../../assets/images/dropdown.svg'

interface ToCProps { 
  markdownRef: React.RefObject<HTMLDivElement>,
  setTableOpen: Dispatch<SetStateAction<boolean>>
}

type nestedHeadingsArray = {
  title: string,
  id: string,
  nested: nestedHeadingsArray[]
}

export default function TableOfContents( {markdownRef, setTableOpen} : ToCProps) {
  
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
                <span className='flex flex-row items-baseline justify-start'><span><button className='w-3 h-3 mr-3' onClick={() => handleOpenHeading(index)}><img src={dropdown} alt='dropdown' className={openHeadings[index] ? 'rotate-180 transition-transform duration-200' : 'rotate-90 transition-transform duration-200'}/></button></span><a className='transition duration-200 lg:hover:text-blue-500 text-lg' onClick={() => {setTableOpen(false)}} href={`#${heading.id}`}>{heading.title}</a></span>
                <div className='overflow-hidden'>
                <AnimatePresence>{openHeadings[index] && <motion.ul className={'ml-10 list-disc'} initial={{opacity: 0, y: '-100%'}} animate={{opacity: 1, transition: {duration: 0.3}, y: 0}} exit={{opacity: 0, transition: {duration: 0.3}, y: '-100%'}}>
                  {heading.nested.map(nestedHeading => {
                  return <li key={nestedHeading.id}>
                    <a className={'transition duration-200 lg:hover:text-blue-500 text-base'} onClick={() => {setTableOpen(false)}} href={`#${nestedHeading.id}`}>{nestedHeading.title}</a>
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