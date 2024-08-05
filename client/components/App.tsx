import { useFruits } from '../hooks/useFruits.ts'
import Comments from './comments/Comments.tsx'
import Comment from './comments/Comment.tsx'
import CommentForm from './comments/oldCommentForm.tsx'
import AllComments from './comments/AllComments.tsx'
import { comment } from 'postcss'
import { useComments } from '../hooks/useComments.ts'
import { fetchComments } from '../apis/comments.ts'
import { useQuery } from '@tanstack/react-query'

function App() {
  const {
    data: comments,
    isFetching,
    isError,
    error,
  } = useQuery({ queryKey: ['comments'], queryFn: () => fetchComments() })
  if (isError) {
    return error.message
  }
  if (isFetching) {
    return <p>...LOADING</p>
  }
  if (comments) {
    return (
      <>
        <div className="app">
          <h1 className="text-3xl font-bold underline">
            Fullstack Boilerplate - with Fruits!
          </h1>

          {/* <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul> */}
          <AllComments comments={comments} />
          {/* <Comments currentUserId="1" /> */}
        </div>
      </>
    )
  }
}
export default App
