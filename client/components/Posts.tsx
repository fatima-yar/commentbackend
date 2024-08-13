import { usePosts } from '../hooks/usePosts'
import Comments from './comments/Comments'

export default function Posts() {
  const { data } = usePosts()
  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with posts!</h1>
        <ul>
          {data &&
            data.map((post) => (
              <li key={post}>
                {post}
                <Comments currentUserId={1} />
              </li>
            ))}
        </ul>

        {/* <Comments currentUserId={1} /> */}
      </div>
    </>
  )
}
