import Post from './Post'
import Folder from './Folder'
import * as postsJSON from '../../posts/posts.json'

export default function List() {

  const posts = postsJSON["posts"]

  return (
    <>
    <div>
      <ul className="list-none mb-10">
        {posts.map(post => {
        return (post.nestedPosts.length > 0 ? <Folder title={post.title} id={post.id} description={post.description} status={post.status} nestedPosts={post.nestedPosts}/> : <Post title={post.title} id={post.id} description={post.description} status={post.status} nested={false}/>)
        })}
      </ul>
    </div>
    </>
  )
}