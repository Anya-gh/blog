import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import home from '../../assets/images/icons8-home-24.png'
import menu from '../../assets/images/icons8-menu-50.png'
import logo from '../../assets/images/logo_shadow_transparent.png'

interface MenuProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function Menu( {setModalOpen} : MenuProps ) {

  const navigate = useNavigate()
  const onClickHome = () => { navigate('/') }
  const onClickMenu = () => { setModalOpen(true)}

  return (
    <>
      <div className='border-r-2 border-l-2 border-b-2 border-zinc-900 bg-darkmetal w-screen h-10 text-sm sticky top-0 right-0 flex flex-row justify-between items-center p-2'>
        <span className="flex flex-row invert">
          <button onClick={onClickHome}><img alt='home' src={home} className='h-8 w-auto mr-2'/></button>
          <button onClick={onClickMenu}><img alt='menu' src={menu} className='h-8 w-auto'/></button>
        </span>
        <span><img alt='logo' src={logo} className='h-8 w-auto'/></span>
      </div>
    </>
  )
}