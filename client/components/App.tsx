import { useFruits } from '../hooks/useFruits.ts'
import AddComments from './comments/AddComments.tsx'
import Comments from './comments/Comments.tsx'
import Posts from './Posts.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <Posts />
        {/* <Comments currentUserId={1} /> */}
      </div>
    </>
  )
}

export default App
