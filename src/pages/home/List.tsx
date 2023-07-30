
export default function List() {
  return (
    <>
    <div>
      <ul className="list-none">
        <ListElement title={"Project 1"} description={"Very cool!"} />
        <ListElement title={"Project 2"} description={"Hmm... yes! Also... very cool! But just how cool? Well, you'll have to wait and see, non?"} />
      </ul>
    </div>
    </>
  )
}

interface ListElementProps {
  title: string,
  description: string
}

const ListElement = ({title, description} : ListElementProps) => {
  return (
    <li className='border-2 rounded-lg border-zinc-800 w-80 p-2 md:w-[35rem] lg:w-[50rem] flex flex-row justify-between mb-2'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-xl'>{title}</h1>
        <p>{description}</p>
      </div>
      <h1>Progress</h1>
    </li>
  )
}
