import { Dispatch, ReactNode, SetStateAction } from 'react'

interface Props {
  children: ReactNode,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal( {children, setModalOpen} : Props ) {
  return (
    <div className='h-screen w-screen bg-darkmetal bg-opacity-80 fixed'>
      <div className='bg-zinc-800 mt-20 mr-10 ml-10 mb-5 p-3 text-sm flex flex-row'>
        <span>{children}</span>
        <button onClick={() => setModalOpen(modal => !modal)} className='border-2 p-2 ml-2'>Close</button>
      </div>
    </div>
  )
}