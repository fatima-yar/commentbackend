import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import Comments from './comments/Comments'
import { Post } from '../../models/post'
import postcss from 'postcss'

// export default function Posts() {
//   const { data } = usePosts()
//   const [activeComment, setActiveComment] = useState<number | null>(null) // Initialize as null

//   const selectHandler = (postId: number) => {
//     setActiveComment(postId)
//   }

//   return (
//     <div className="app">
//       <h1>Fullstack Boilerplate - with posts!</h1>
//       <ul>
//         {data &&
//           data.map(
//             (
//               post: Post, // Ensure post is typed as Post
//             ) => (
//               <li key={post.id}>
//                 {post.content}
//                 <button onClick={() => selectHandler(post.id)}>Comments</button>
//                 {activeComment === post.id && <Comments currentUserId={1} />}
//               </li>
//             ),
//           )}
//       </ul>
//     </div>
//   )
// }

export default function Posts() {
  const { data, error, loading } = usePosts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading posts: {error.message}</div>

  return (
    <div className="app">
      <h1>Fullstack Boilerplate - with posts!</h1>
      <ul>
        {data &&
          data.map((post) => (
            <li key={post}>
              {post} <Comments currentUserId={1} />
            </li>
          ))}
      </ul>
    </div>
  )
}
