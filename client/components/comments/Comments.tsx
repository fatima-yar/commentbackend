import { useEffect, useState } from 'react'
import { Comments as CommentsInt } from '../../../models/comments'
import {
  getAllComments,
  addComment as addCommentApi,
  useDeleteComment,
} from '../../apis/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CommentsProps {
  currentUserId: number
}

interface ActiveComment {
  id: number
  type: 'replying' | 'editing'
}
interface MutationProps {
  body: string
  parent_id: number | null
  user_id: number
}
export default function Comments({ currentUserId }: CommentsProps) {
  const [backendComments, setBackendComments] = useState<CommentsInt[]>([])
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null)
  const [form, setForm] = useState('')

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent_id === null,
  )
  const queryClient = useQueryClient()

  const { mutate: deleteCommentApi } = useDeleteComment()

  const addCommentMutation = useMutation({
    mutationFn: async (props: MutationProps) => {
      return addCommentApi(props.body, props.parent_id, props.user_id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['comments'])
    },
    onError: (error) => {
      console.error('Failed to add comment', error)
    },
  })

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

  function getReplies(commentId: number): CommentsInt[] {
    return backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
  }

  // const addComment = (text: string, parent_id: number | null) => {
  //   addCommentApi(text, parent_id)
  //     .then((comment: CommentsInt) => {
  //       setBackendComments([comment, ...backendComments])
  //       setActiveComment(null)
  //     })
  //     .catch((error) => {
  //       console.log('Failed to add comment', error)
  //     })
  // }
  const handleSubmit = (text: string) => {
    addCommentMutation.mutate({
      body: text,
      parent_id: null, // Or set this based on the context
      user_id: currentUserId,
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

  //     window.location.reload()

  return (
    <div>
      <h3>Comments</h3>
      <div>Write Comment</div>
      <CommentForm
        submitLabel="Write"
        handleSubmit={handleSubmit} // Pass the function here
        parent_id={null}
        hasCancelButton={false}
        handleCancel={() => {}}
        initialValue={form} // If you want to use form state
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
              addComment={handleSubmit} // Correct function usage here
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
