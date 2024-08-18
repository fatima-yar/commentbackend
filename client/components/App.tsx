import { useFruits } from '../hooks/useFruits.ts'
import AddComments from './comments/AddComments.tsx'
import Comments from './comments/Comments.tsx'
import Posts from './Posts.tsx'
import bg from '../../public/bg.jpg'
function App() {
  const { data } = useFruits()

  return (
    <>
      <div
        className="bg-opacity-60"
        style={{
          backgroundImage: 'url(../../public/bg.jpg)',
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
        }}
      >
        <Posts />
      </div>
    </>
  )
}

export default App
