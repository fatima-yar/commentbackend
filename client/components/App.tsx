import { useFruits } from '../hooks/useFruits.ts'
import Comments from './comments/Comments.tsx'
import Comment from './comments/Comment.tsx'
import CommentForm from './comments/CommentForm.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Fruits!
        </h1>

        {/* <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul> */}

        {/* <Comments currentUserId="1" /> */}
      </div>
    </>
  )
}

export default App
