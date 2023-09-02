import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { themes } from "../../components/Themes"
import dateicon from '../../assets/images/date.svg'
import home from '../../assets/images/home.svg'
import menu from '../../assets/images/menu.svg'
import { useNavigate } from "react-router-dom"

type BannerProps = {
  title: string,
  date: string,
  theme?: string,
  setTableOpen: Dispatch<SetStateAction<boolean>>
}

export default function Banner( {title, date, theme, setTableOpen} : BannerProps) {
  
  const [bg, setBg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (theme && themes[theme] !== undefined) {
      setBg(themes[theme])
    }
    else {
      setBg(themes['temp'])
    }
  }, [])

  return (
    <div className='pt-20 pb-10 w-full top-0 sticky bg-darkmetal'>
      <div className={`rounded-br-lg rounded-bl-lg w-full h-28 lg:h-32 ${bg}`}>
        <div className='w-full h-full flex flex-row items-center justify-center bg-black bg-opacity-50 rounded-br-lg rounded-bl-lg p-10'>
          <div className='flex flex-col mr-5'>
            <button onClick={() => navigate('/')}><img src={home} alt='home' className='h-6 mb-3' /></button>
            <button onClick={() => setTableOpen(table => !table)}><img src={menu} alt='menu' className='h-6' /></button>
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold text-xl lg:text-3xl'>{title}</h1> 
            <span className='flex flex-row opacity-70'><img src={dateicon} alt='date' className='h-3 mr-2'/><p className='text-sm'>{date}</p></span>
          </div>
        </div>
      </div>
    </div>
  )
}
