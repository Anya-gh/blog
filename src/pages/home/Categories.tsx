import { Dispatch, SetStateAction } from 'react'
import tag from '../../assets/icons/tag.svg'

type Categories = {
  activeCategory: string,
  setActiveCategory: Dispatch<SetStateAction<string>>
}

export default function Categories( {activeCategory, setActiveCategory} : Categories ) {

  return (
    <div className='flex flex-row mb-10 mt-10 w-80 md:w-[30rem] lg:w-[50rem] tracking-widest flex-wrap'>
        <Category name='All' activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        <Category name='Projects' activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        <Category name='Achievements' activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        <Category name='Web apps' activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        <Category name='Machine learning' activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
      </div>
  )
}

type Category = {
  name: string,
  activeCategory: string,
  setActiveCategory: Dispatch<SetStateAction<string>>
}

const Category = ({name, activeCategory, setActiveCategory} : Category) => {

  return (
    <button onClick={() => setActiveCategory(active => active === name ? 'All' : name)} className={'rounded-3xl flex flex-row p-4 m-2 flex-shrink-0 border-zinc-800 transition duration-200 md:text-base text-xs bg-zinc-700 ' + (activeCategory == name && ' bg-zinc-800')}>
      <img src={tag} alt='tag' className='md:h-5 h-3 mr-2' />
      <p>{name}</p>
    </button> 
  )
}