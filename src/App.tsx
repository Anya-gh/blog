import { Routes, Route, useLocation } from 'react-router-dom'
import Blog from './pages/blog/Blog'
import './App.css'
import Home from './pages/home/Home'
import * as postsJSON from './posts/posts.json'
import { AnimatePresence } from 'framer-motion'

function App() {

  const posts = postsJSON["posts"]
  const location = useLocation()

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='' element={<Home />}/>
        {posts.map(post => {
          return (
            <Route key={post.title} path={`/${post.id}`} element={<Blog id={post.id}/>}/>
          )
        })}
      </Routes>
    </AnimatePresence>
    
  )
}

export default App
