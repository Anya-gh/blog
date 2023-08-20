import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import home from '../../assets/images/home.svg'
import menu from '../../assets/images/menu.svg'
import logo from '../../assets/images/logo.svg'

interface MenuProps {
  setTableOpen: Dispatch<SetStateAction<boolean>>,
  largeScreen: boolean
}

export default function Menu( {setTableOpen, largeScreen} : MenuProps ) {

  const navigate = useNavigate()
  const onClickHome = () => { navigate('/') }
  const onClickMenu = () => { setTableOpen(open => !open) }

  return (
    <>
      <div className={largeScreen ? 'flex-shrink-0 border-r-4 border-zinc-900 ml-4 bg-zinc-800 h-[45rem] w-16 text-sm flex flex-col p-2 items-center justify-between' : 'border-b-2 border-zinc-800 bg-darkmetal w-screen h-10 text-sm sticky top-0 left-0 flex flex-row justify-between items-center'}>
        <span className="flex flex-row lg:flex-col">
          <button onClick={onClickHome}><img alt='home' src={home} className='h-6 lg:h-auto pl-2 lg:p-3 mr-2 lg:mr-0 lg:mb-4'/></button>
          <button onClick={onClickMenu} className="lg:border-t-4 border-zinc-700 lg:pt-3 pl-2 lg:pl-1"><img alt='menu' src={menu} className='h-6 lg:h-auto lg:p-3'/></button>
        </span>
        <span className="lg:border-t-4 border-zinc-700 lg:pt-3"><a href='https://anya-gh.github.io/portfolio/'><img alt='logo' src={logo} className='h-7 pr-2 lg:h-auto'/></a></span>
      </div>
    </>
  )
}