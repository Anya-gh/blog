import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface PostProps {
  title: string,
  id: string,
  description: string,
  status: string,
}

export default function Post( {title, id, description, status} : PostProps) {

  const [color, setColor] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
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
    <li>
      <button onClick={(() => onClickHandler(id))} className='border-2 rounded-lg border-zinc-800 w-80 p-2 md:w-[35rem] lg:w-[50rem] flex flex-row justify-between mb-2 items-center'>
        <div className='flex flex-col items-start'>
          <span className='flex flex-row items-baseline'>
          <h1 className='font-bold text-xl'>{title}</h1></span>
          <p className='text-left'>{description}</p>
        </div>
        <h1 className={'tracking-widest ml-3 ' + color}>{status}</h1>
      </button>
    </li>
  )
}
