import mail from '../assets/icons/mail.svg'
import github from '../assets/icons/github-mark-white.svg'
import linkedin from '../assets/icons/LI-In-Bug.png'
import circle from '../assets/icons/circle.svg'

export default function Footer() {
  return (
    <>
      <Icons />
      <p className='pb-10 text-sm tracking-widest text-slate-500 text-center w-80 md:w-full'>Created by me! You can have a look on GitHub <a href="https://github.com/Anya-gh/blog" className='text-slate-300'>here</a>.</p>
    </>
  )
}

function Icons() {
  return (
    <div className='flex flex-row items-center justify-between pb-10 w-60 md:w-[30rem]'>
      <a href="mailto:anya2718@icloud.com"><img src={mail} className='h-6' alt='mail' /></a>
      <img src={circle} className='h-1 mx-5 opacity-50' alt='circle' />
      <a href="https://github.com/Anya-gh/"><img src={github} className='h-8' alt='mail' /></a>
      <img src={circle} className='h-1 mx-5 opacity-50' alt='circle' />
      <a href="https://www.linkedin.com/in/aniket-singh-dev/"><img src={linkedin} className='h-8' alt='mail' /></a>
    </div>
  )
}
