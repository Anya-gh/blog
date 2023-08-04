import { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>,
  markdownRef: React.RefObject<HTMLDivElement>
}

export default function Modal( {setModalOpen, markdownRef} : Props ) {
  return (
    <motion.div className='h-screen w-screen bg-darkmetal bg-opacity-80 fixed'
    exit={{opacity: 0, transition: {duration: 0.2}}} initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.2}}}>
      <div className='bg-zinc-800 mt-20 mr-10 ml-10 mb-5 p-3 text-sm flex flex-row justify-between'>
        <TableOfContents markdownRef={markdownRef} setModalOpen={setModalOpen} />
        <button onClick={() => setModalOpen(modal => !modal)} className='border-2 h-10 border-zinc-900 bg-zinc-800 opacity-80 p-2 ml-2 transition duration-200 md:hover:brightness-125'>Close</button>
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
  if (headings) {
    const headingsArray = Array.from(headings)
    const nestedHeadings:nestedHeadingsArray[] = []
    headingsArray.forEach(heading => {
      if (heading.tagName === 'H2') { 
        nestedHeadings.push({title: heading.innerText, id: heading.id, nested: []}) 
      }
      if (heading.tagName === 'H3') {
        nestedHeadings[nestedHeadings.length - 1].nested.push({title: heading.innerText, id: heading.id, nested: []})
      }
      if (heading.tagName === 'H4') {
        const length = nestedHeadings.length - 1
        const nestedNested = nestedHeadings[length].nested[nestedHeadings[length].nested.length - 1].nested
        nestedNested.push({title: heading.innerText, id: heading.id, nested: []})
      }
    })
    console.log(nestedHeadings)
    return (
      <>
        <ul className='ml-3'>
          {nestedHeadings.map(heading => {
            return (
                <li key={heading.id}>
                  <a className={'transition duration-200 lg:hover:text-blue-500 scroll-smooth'} onClick={() => {setModalOpen(false)}} href={`#${heading.id}`}>{heading.title}</a>
                  <ul className={'list-disc list-outside ml-3'}>
                    {heading.nested.map(nestedHeading => {
                    return <li key={nestedHeading.id}>
                      <a className={'transition duration-200 lg:hover:text-blue-500 pl-2'} onClick={() => {setModalOpen(false)}} href={`#${nestedHeading.id}`}>{nestedHeading.title}</a>
                    </li>
                    })}
                  </ul>
                </li>
            )
          })}
        </ul>
      </>
      
    )
  }
  return (<></>)
}