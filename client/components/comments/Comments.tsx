import { useEffect, useState } from 'react'
import {
  Comments as CommentsInt,
  NewCommentsData,
} from '../../../models/comments'
import {
  getAllComments,
  addComment as addCommentApi,
} from '../../apis/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'

const Comments = () => {
  const [backendComments, setBackendComments] = useState<CommentsInt[]>([])
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null)
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent_id === null,
  )
  function getReplies(commentId: string): CommentsInt[] {
    return backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
  }
  const addComment = (text: string, parent_id: number | null) => {
    addCommentApi(text, parent_id)
      .then((comment: CommentsInt) => {
        setBackendComments([comment, ...backendComments])
        setActiveComment(null)
      })
      .catch((error) => {
        console.log('Failed to add comment', error)
      })
  }
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getAllComments()
        setBackendComments(data)
      } catch (error) {
        console.error('Failed to fetch comments', error)
      }
    }
    fetchComments()
  }, [])

  return (
    <div>
      <h3>Comments</h3>
      <div>Write Comment</div>
      <CommentForm
        submitLabel="Write"
        handleSubmit={(text) => addComment(text, null)}
        parent_id={null}
        hasCancelButton={false}
        handleCancel={function (): void {
          throw new Error('Function not implemented.')
        }}
      />

      <ul>
        {rootComments.map((rootComment) => (
          <>
            <li key={rootComment.id}></li>
            <Comment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
            />
          </>
        ))}
      </ul>
    </div>
  )
}

export default Comments
