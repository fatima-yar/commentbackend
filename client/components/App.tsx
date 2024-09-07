import { TypeAnimation } from 'react-type-animation'
import Posts from './Posts.tsx'
import Reaction from './comments/Reaction.tsx'

function App() {
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
        }}
      >
        <Posts />
        <div className="flex items-center justify-center pb-8   pt-4 backdrop-blur-sm ">
          <TypeAnimation
            sequence={[
              'Created By Fatima',
              1000,
              'Created By React',
              1000,
              'Created By TypeScript',
              1000,
              'Created By Enthusiasm!',
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1em', display: 'inline-block' }}
            repeat={Infinity}
          />
        </div>
      </div>
    </>
  )
}

export default App
