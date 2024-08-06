import { useFruits } from '../hooks/useFruits.ts'
import Comments from './comments/Comments.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">
          Fullstack Boilerplate - with Fruits!
        </h1>
        <Comments currentUserId="1" />
      </div>
    </>
  )
}

export default App
