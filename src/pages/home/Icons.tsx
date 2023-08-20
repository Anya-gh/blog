import mail from '../../assets/images/mail.svg'
import github from '../../assets/images/github-mark-white.svg'
import linkedin from '../../assets/images/LI-In-Bug.png'
import circle from '../../assets/images/circle.svg'

export default function Icons() {
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
