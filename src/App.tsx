import { Routes, Route, useLocation } from 'react-router-dom'
import Blog from './pages/blog/Blog'
import './App.css'
import Home from './pages/home/Home'
import { default as postsJSON } from './assets/posts/posts.json'
import { AnimatePresence } from 'framer-motion'
import { PostType } from './pages/home/List'

function App() {

  const posts: PostType[] = postsJSON
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='' element={<Home />}/>
        {posts.map(post => {
          return ( 
            post.nestedPosts ? post.nestedPosts.map(nestedPost => { return ( <Route key={`${post.title}/${nestedPost.title}`} path={`/${post.id}/${nestedPost.id}`} element={<Blog id={`${post.id}/${nestedPost.id}`}/>}/> )})
            : <Route key={post.title} path={`/${post.id}`} element={<Blog id={post.id}/>}/>
          )
        })}
      </Routes>
    </AnimatePresence>
    
  )
}

export default App
