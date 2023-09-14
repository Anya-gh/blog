import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nestedPostType } from './List'
import circle from '../../assets/icons/circle.svg'
import { themes } from '../../components/Themes'

type PostProps = nestedPostType & {
  nested: boolean
}

export default function Post( {title, id, description, status, category, date, nested, theme} : PostProps) {

  const [color, setColor] = useState('')
  const [bg, setBg] = useState('')
  const [credit, setCredit] = useState<string | undefined>(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(credit)
    if (theme && themes[theme] !== undefined) {
      setBg(themes[theme].style)
      setCredit(themes[theme].credit)
    }
    else {
      setBg(themes['temp'].style)
      setCredit(themes['temp'].credit)
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
        <button onClick={(() => onClickHandler(id))} className={`rounded-lg flex flex-col mb-4 min-h-[7rem] ` + (nested ? ' w-72 md:w-[33rem] lg:w-[48rem]' : ` w-80 md:w-[35rem] lg:w-[50rem] ${bg}`)}>
          <div className='w-full min-h-[7rem] h-full bg-opacity-50 bg-black p-2 rounded-lg'>
          <div className='flex flex-col mb-1'>
              <span className='flex flex-row justify-between'><h1 className='font-bold text-xl text-left'>{title}</h1><h1 className={'tracking-widest ml-3 mr-2 ' + color}>{status}</h1></span>
              <span className='flex flex-row items-center tracking-widest text-gray-400'><p>{date}</p><img src={circle} className='h-1 mx-5' alt='circle'/><p>{category}</p></span>
          </div>
          <p className='text-left text-gray-300'>{description}</p>
          <div className='mb-2'>
            {credit && <p className='text-left text-sm text-gray-400'>{credit}</p>}
          </div>
          </div>
        </button>
      </>
  )
}
