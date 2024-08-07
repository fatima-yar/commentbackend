import { useEffect, useState } from 'react'
import { Comments as CommentsInt } from '../../../models/comments'
import {
  getAllComments,
  addComment as addCommentApi,
  useDeleteComment,
} from '../../apis/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'

interface CommentsProps {
  currentUserId: number
}

interface ActiveComment {
  id: number
  type: 'replying' | 'editing'
}

export default function Comments({ currentUserId }: CommentsProps) {
  const [backendComments, setBackendComments] = useState<CommentsInt[]>([])
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null)
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent_id === null,
  )

  const { mutate: deleteCommentApi } = useDeleteComment() // Use the hook here

  function getReplies(commentId: number): CommentsInt[] {
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
  const deleteComment = (commentId: number) => {
    if (window.confirm('Are you sure?')) {
      deleteCommentApi(commentId, {
        onSuccess: () => {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId,
          )
          setBackendComments(updatedBackendComments)
        },
        onError: (error: unknown) => {
          console.error('Failed to delete comment', error)
        },
      })
    }
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

  console.log(currentUserId)

  return (
    <div>
      <h3>Comments</h3>
      <div>Write Comment</div>
      <CommentForm
        submitLabel="Write"
        handleSubmit={(text) => addComment(text, null)}
        parent_id={null}
        hasCancelButton={false}
        handleCancel={() => {
          throw new Error('Function not implemented.')
        }}
      />
      <ul>
        {rootComments.map((rootComment) => (
          <li key={rootComment.id}>
            <Comment
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
