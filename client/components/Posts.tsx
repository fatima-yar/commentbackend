// import { useState } from 'react'
// import { usePosts } from '../hooks/usePosts'
// import Comments from './comments/Comments'
// import { Post } from '../../models/post'

import { useFruits } from '../hooks/useFruits.ts'
import AddComments from './comments/AddComments.tsx'
import Comments from './comments/Comments.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Fruits!
        </h1>
        <Comments currentUserId={3} />
        {/* <AddComments /> */}
      </div>
    </>
  )
}

export default App

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

// export default function Posts() {
//   const { data } = usePosts()
//   const [activeComment, setActiveComment]=useState(1)
//   const selectHandler = (postId: number) => {
//     setActiveComment(postId)
//   }
//   return (
//     <>
//       <div className="app">
//         <h1>Fullstack Boilerplate - with posts!</h1>
//         <ul>
//           {data &&
//             data.map((post) => (
//               <li key={post}>
//                 {post}
//                 <Comments currentUserId={1} />
//               </li>
//             ))}
//         </ul>

//         {/* <Comments currentUserId={1} /> */}
//       </div>
//     </>
//   )
// }
