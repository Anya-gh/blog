import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import home from '../../assets/images/home.svg'
import menu from '../../assets/images/menu.svg'
import logo from '../../assets/images/logo_shadow_transparent.png'

interface MenuProps {
  setTableOpen: Dispatch<SetStateAction<boolean>>
}

export default function Menu( {setTableOpen} : MenuProps ) {

  const navigate = useNavigate()
  const onClickHome = () => { navigate('/') }
  const onClickMenu = () => { setTableOpen(open => !open) }

  return (
    <>
      <div className='border-r-2 border-l-2 border-b-2 border-zinc-900 bg-darkmetal w-screen lg:w-32 h-10 lg:h-screen text-sm sticky top-0 left-0 lg:top-auto flex flex-row lg:flex-col justify-between items-center p-4 lg:p-2'>
        <span className="flex flex-row lg:flex-col">
          <button onClick={onClickHome}><img alt='home' src={home} className='h-8 p-1 lg:p-0 mr-2 lg:mr-0 lg:mb-4'/></button>
          <button onClick={onClickMenu}><img alt='menu' src={menu} className='h-8 p-1 lg:p-0'/></button>
        </span>
        <span><a href='anya-gh.github.io/portfolio'><img alt='logo' src={logo} className='h-8 lg:h-auto'/></a></span>
      </div>
    </>
  )
}