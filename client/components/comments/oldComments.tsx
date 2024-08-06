import { useEffect, useState } from 'react'
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from '../../../server/dummy data/api'
import Comment from './oldComment'
import CommentForm from './oldCommentForm'

interface CommentsProps {
  currentUserId: string
}
export interface CommentData {
  id: string
  body: string
  username: string
  userId: string
  parentId: string | null
  createdAt: string
}
interface ActiveComment {
  id: string
  type: 'replying' | 'editing'
}

export default function Comments({ currentUserId }: CommentsProps) {
  const [backendComments, setBackendComments] = useState<CommentData[]>([])
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null)

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null,
  )
  function getReplies(commendId: string): CommentData[] {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commendId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
  }
  const addComment = (text: string, parentId: string | null) => {
    console.log(text, parentId)
    createCommentApi(text, parentId)
      .then((comment: CommentData) => {
        setBackendComments([comment, ...backendComments])
        setActiveComment(null)
      })
      .catch((error) => {
        console.log('Failed to add comment', error)
      })
  }
  const updateComment = (text: string, commentId: string) => {
    updateCommentApi(text, commentId)
      .then(() => {
        const updatedBackendComments = backendComments.map((backendComment) =>
          backendComment.id === commentId
            ? { ...backendComment, body: text }
            : backendComment,
        )
        setBackendComments(updatedBackendComments)
        setActiveComment(null)
      })
      .catch((error) => {
        console.error('Failed to update comment', error)
      })
  }

  const deleteComment = (commentId: string) => {
    if (window.confirm('Are you sure?')) {
      deleteCommentApi(commentId)
        .then(() => {
          // Filter out the deleted comment from the state
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId,
          )
          // Update the state with the new comments list
          setBackendComments(updatedBackendComments)
        })
        .catch((error) => {
          // Handle the error properly
          console.error('Failed to delete comment', error)
        })
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsApi()
        setBackendComments(data)
      } catch (error) {
        console.error('Failed to fetch comments', error)
      }
    }
    fetchComments()
  }, [])

  return (
    <>
      <div>
        <h3>Comments</h3>
        <div>Write Comment</div>
        <CommentForm
          submitLabel="Write"
          handleSubmit={(text) => addComment(text, null)}
          parentId={null}
        />
        <div>
          {rootComments.map((rootComment) => (
            <Comment
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              currentUserId={currentUserId}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              updateComment={updateComment}
            />
          ))}
        </div>
      </div>
    </>
  )
}
