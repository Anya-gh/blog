import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface PostProps {
  title: string,
  id: string,
  description: string,
  status: string,
  nested: boolean
}

export default function Post( {title, id, description, status, nested} : PostProps) {

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
      <button onClick={(() => onClickHandler(id))} className={'border-2 rounded-lg border-zinc-800 bg-darkmetal p-2 flex flex-col mb-2 ' + (nested ? ' w-72 md:w-[33rem] lg:w-[48rem]' : ' w-80 md:w-[35rem] lg:w-[50rem]')}>
        <div className='flex flex-row justify-between mb-2'>
          <h1 className='font-bold text-xl text-left'>{title}</h1>
          <h1 className={'tracking-widest ml-3 mr-2 ' + color}>{status}</h1>
        </div>
        <p className='text-left mb-2'>{description}</p>
      </button>
    </li>
  )
}
