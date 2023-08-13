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
          /*if (post.nestedPosts.length > 0) { return (
            <Route key={post.title} path={`/${post.id}`} element={<Blog id={post.id}/>}/>
          )}
          else  { post.nestedPosts.map(nestedPost => {
            return ( <Route key={nestedPost.title} path={`/${nestedPost.id}`} element={<Blog id={nestedPost.id}/>}/> )
          })}*/
          return ( 
            post.nestedPosts.length > 0 ? post.nestedPosts.map(nestedPost => { return ( <Route key={nestedPost.title} path={`/${post.id}/${nestedPost.id}`} element={<Blog id={nestedPost.id}/>}/> )})
            : <Route key={post.title} path={`/${post.id}`} element={<Blog id={post.id}/>}/>
          )
        })}
      </Routes>
    </AnimatePresence>
    
  )
}

export default App
