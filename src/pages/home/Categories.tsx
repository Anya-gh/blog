import { Dispatch, SetStateAction } from 'react'
import tag from '../../assets/images/tag.svg'

type Categories = {
  activeCategory: string,
  setActiveCategory: Dispatch<SetStateAction<string>>
}

export default function Categories( {activeCategory, setActiveCategory} : Categories ) {

  const onClickHandler = (activeCategory: string) => {
    setActiveCategory(active => active == activeCategory ? 'all' : activeCategory)
  }

  return (
    <div className='flex flex-row mb-5 mt-10 w-80 md:w-[30rem] lg:w-[50rem] tracking-widest flex-wrap'>
        {/*<button onClick={() => onClickHandler('all')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row p-4 mr-5 flex-shrink-0 border-zinc-800 transition duration-200 ' + (activeCategory == 'all' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>All</p>
        </button>
        <button onClick={() => onClickHandler('projects')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row p-4 mr-5 flex-shrink-0 border-zinc-800 transition duration-200 ' + (activeCategory == 'projects' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>Projects</p>
        </button>
        <button onClick={() => onClickHandler('achievements')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row flex-shrink-0 p-4 mr-5 border-zinc-800 transition duration-200 ' + (activeCategory == 'achievements' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>Achievements</p>
        </button>
        <button onClick={() => onClickHandler('new_tech')} className={'border-r-2 border-l-2 border-t-2 rounded-t-xl flex flex-row flex-shrink-0 p-4 border-zinc-800 transition duration-200 ' + (activeCategory == 'new_tech' && ' bg-zinc-800')}>
          <img src={folder_transparent} alt='folder' className='h-5 mr-2'/>
          <p className='tracking-widest'>New tech</p>
  </button>*/}
        <button onClick={() => onClickHandler('all')} className={'rounded-3xl flex flex-row p-4 m-2 flex-shrink-0 border-zinc-800 transition duration-200 bg-zinc-700 ' + (activeCategory == 'all' && ' bg-zinc-800')}>
          <img src={tag} alt='tag' className='h-5 mr-2' />
          <p>All</p>
        </button>
        <button onClick={() => onClickHandler('projects')} className={'rounded-3xl flex flex-row p-4 m-2 flex-shrink-0 border-zinc-800 transition duration-200 bg-zinc-700 ' + (activeCategory == 'projects' && ' bg-zinc-800')}>
          <img src={tag} alt='tag' className='h-5 mr-2' />
          <p>Projects</p>
        </button>
        <button onClick={() => onClickHandler('achievements')} className={'rounded-3xl flex flex-row p-4 m-2 flex-shrink-0 border-zinc-800 transition duration-200 bg-zinc-700 ' + (activeCategory == 'achievements' && ' bg-zinc-800')}>
          <img src={tag} alt='tag' className='h-5 mr-2' />
          <p>Achievements</p>
        </button>
        <button onClick={() => onClickHandler('new_tech')} className={'rounded-3xl flex flex-row p-4 m-2 flex-shrink-0 border-zinc-800 transition duration-200 bg-zinc-700 ' + (activeCategory == 'new_tech' && ' bg-zinc-800')}>
          <img src={tag} alt='tag' className='h-5 mr-2' />
          <p>New tech</p>
        </button>
        
      </div>
  )
}