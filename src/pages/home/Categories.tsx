import folder_transparent from '../../assets/images/folder-transparent.svg'
import { useState } from 'react'

export default function Categories() {

  const [active, setActive] = useState('all')

  const onClickHandler = (activeCategory: string) => {
    setActive(active => active == activeCategory ? 'all' : activeCategory)
  }

  return (
    <div className='flex flex-row justify-between mb-5 border-b-2 border-zinc-800 mt-10 w-80 md:w-[30rem] lg:w-[50rem] overflow-scroll'>
        <button onClick={() => onClickHandler('all')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row p-4 mr-5 flex-shrink-0 border-zinc-800 transition duration-200 ' + (active == 'all' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>All</p>
        </button>
        <button onClick={() => onClickHandler('projects')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row p-4 mr-5 flex-shrink-0 border-zinc-800 transition duration-200 ' + (active == 'projects' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>Projects</p>
        </button>
        <button onClick={() => onClickHandler('achievements')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row flex-shrink-0 p-4 mr-5 border-zinc-800 transition duration-200 ' + (active == 'achievements' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>Achievements</p>
        </button>
        <button onClick={() => onClickHandler('new_tech')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row flex-shrink-0 p-4 border-zinc-800 transition duration-200 ' + (active == 'new_tech' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>New tech</p>
        </button>
      </div>
  )
}
