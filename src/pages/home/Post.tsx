import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nestedPostType } from './List'
import circle from '../../assets/images/circle.svg'
import { bgs } from './List'

type PostProps = nestedPostType & {
  nested: boolean
}

export default function Post( {title, id, description, status, category, date, nested, theme} : PostProps) {

  const [color, setColor] = useState('')
  const [bg, setBg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (theme) { 
      setBg(bgs[theme])
    }
    else {
      setBg(bgs['temp'])
    }
    switch(status) {
      case "IN PROGRESS": 
        setColor('text-sky-400')
        break;
      case "PLANNED":
        setColor('text-slate-400')
        break;
      case "COMPLETE":
        setColor('text-emerald-400')
        break;
    }
  }, [])

  const onClickHandler = (id:string) => {
    navigate(id)
  }

  return (
      <>
        {/* tailwind needs to see the class to know it cares about it. That's why you have to enter the image manually before it will work dynamically. This will 100% be a problem on production. Might be better to make them custom classes in config.*/}
        <button onClick={(() => onClickHandler(id))} className={`rounded-lg flex flex-col mb-2` + (nested ? ' w-72 md:w-[33rem] lg:w-[48rem]' : ` w-80 md:w-[35rem] lg:w-[50rem] ${bg}`)}>
          <div className='w-full h-full bg-opacity-50 bg-black p-2 rounded-lg'>
          <div className='flex flex-col mb-1'>
              <span className='flex flex-row justify-between'><h1 className='font-bold text-xl text-left'>{title}</h1><h1 className={'tracking-widest ml-3 mr-2 ' + color}>{status}</h1></span>
              <span className='flex flex-row items-center tracking-widest text-gray-400'><p>{date}</p><img src={circle} className='h-1 mx-5' alt='circle'/><p>{category}</p></span>
          </div>
          <p className='text-left mb-2 text-gray-300'>{description}</p>
          </div>
        </button>
      </>
  )
}
