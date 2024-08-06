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
        <Comments currentUserId={1} />
        {/* <AddComments /> */}
      </div>
    </>
  )
}

export default App
