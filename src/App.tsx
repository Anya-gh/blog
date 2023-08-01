import { Routes, Route } from 'react-router-dom'
import Blog from './pages/blog/Blog'
import './App.css'
import Home from './pages/home/Home'
import * as postsJSON from './posts/posts.json'

function App() {

  const posts = postsJSON["posts"]


  return (
    <Routes>
      <Route path='' element={<Home />}/>
      {posts.map(post => {
        console.log(post.id)
        return (
          <Route key={post.title} path={`/${post.id}`} element={<Blog id={post.id}/>}/>
        )
      })}
    </Routes>
  )
}

export default App
