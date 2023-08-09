import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import home from '../../assets/images/home.svg'
import menu from '../../assets/images/menu.svg'
import logo from '../../assets/images/logo_shadow_transparent.png'

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
      <div className={largeScreen ? 'flex-shrink-0 border-r-4 border-zinc-800 bg-darkmetal h-screen w-16 text-sm flex flex-col p-2 items-center justify-between ' : 'border-r-2 border-l-2 border-b-2 border-zinc-800 bg-darkmetal w-screen h-10 text-sm sticky top-0 left-0 flex flex-row justify-between items-center'}>
        <span className="flex flex-row lg:flex-col">
          <button onClick={onClickHome}><img alt='home' src={home} className='h-8 p-1 lg:p-0 mr-2 lg:mr-0 lg:mb-4'/></button>
          <button onClick={onClickMenu} className="border-t-4 border-zinc-800 pt-3 pl-1"><img alt='menu' src={menu} className='h-8 lg:p-0'/></button>
        </span>
        <span className="border-t-4 border-zinc-800 pt-3"><a href='anya-gh.github.io/portfolio'><img alt='logo' src={logo} className='h-8 lg:h-auto'/></a></span>
      </div>
    </>
  )
}