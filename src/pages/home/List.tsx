import Post from './Post'
import Folder from './Folder'
import { default as postsJSON } from '../../posts/posts.json'
import { motion, AnimatePresence } from 'framer-motion'

interface StringMap {
  [key: string]: string;
}

export const bgs: StringMap = {
  sunset: `bg-[url('./assets/bgs/sunset.jpg')] bg-cover bg-center`,
  piano: `bg-[url('./assets/bgs/person-playing-piano.jpg')] bg-cover bg-center`,
  temp : `bg-[url('./assets/bgs/pexels-tirachard-kumtanom-733856.jpg')] bg-cover bg-center`
}

export type nestedPostType = {
  title: string,
  id: string,
  description: string,
  date: string,
  category: string,
  status: string
  theme? : string
}

export type PostType = nestedPostType & {
  nestedPosts?: nestedPostType[]
}

type ListProps = {
  activeCategory: string
}

export default function List( {activeCategory} : ListProps) {

  const posts: PostType[] = postsJSON

  return (
    <>
    <div>
      <ul className="list-none mb-10">
        <AnimatePresence>
        {posts.map(post => {
          if ((activeCategory === 'all') || (post.category.toLowerCase() === activeCategory.toLowerCase())) {
            return ( 
              <motion.li key={post.id} initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: "auto"}} exit={{opacity: 0, height: 0}}>
                {post.nestedPosts ? <Folder title={post.title} id={post.id} description={post.description} status={post.status} date={post.date} category={post.category} nestedPosts={post.nestedPosts} theme={post.theme}/> : <Post title={post.title} id={post.id} description={post.description} category={post.category} date={post.date} status={post.status} theme={post.theme} nested={false}/>}
              </motion.li>
            )
          }})
        }
        </AnimatePresence>
      </ul>
    </div>
    </>
  )
}