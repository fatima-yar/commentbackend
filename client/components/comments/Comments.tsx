import { useEffect, useState } from 'react'
import { Comments as CommentsInt } from '../../../models/comments'
import {
  getAllComments,
  addComment as addCommentApi,
  useDeleteComment,
  useUpdateComment,
  getCommentsByPostId,
} from '../../apis/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateComment } from '../../../server/db/comments'
interface CommentsProps {
  currentUserId: number
  postId: number
}

interface ActiveComment {
  id: number
  type: 'replying' | 'editing'
}

export default function Comments({ currentUserId, postId }: CommentsProps) {
  // console.log('Fetching comments for post ID:', postId)
  const [backendComments, setBackendComments] = useState<CommentsInt[]>([])
  const [activeComment, setActiveComment] = useState<ActiveComment | null>(null)
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parent_id === null,
  )

  const { mutate: deleteCommentApi } = useDeleteComment()
  const { mutate: updateCommentApi } = useUpdateComment()

  function getReplies(commentId: number): CommentsInt[] {
    return backendComments
      .filter((backendComment) => backendComment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
  }

  const addComment = (text: string, parent_id: number | null) => {
    addCommentApi(text, parent_id, postId)
      .then((comment: CommentsInt) => {
        if (comment) {
          // Ensure comment is not null
          setBackendComments([comment, ...backendComments])
          setActiveComment(null)
        } else {
          console.error('Received null comment from API')
        }
      })
      .catch((error) => {
        console.log('Failed to add comment', error)
      })
  }

  // const queryClient = useQueryClient()
  // interface MutationProps {
  //   post: string
  //   parent_id: number | null
  // }
  // const addCommentMutation  = useMutation({
  //   mutationFn: async (props:MutationProps)=>{

  //     return addCommentApi (props.post, props.parent_id)

  //   },
  //   onSuccess:()=>{
  //     queryClient.invalidateQueries({
  //       queryKey:['comments']
  //     })
  //   }
  // })

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
  // const updateComment = (id: number, body: string) => {
  //   console.log('Component:', body)
  //   updateCommentApi({ id, body })
  // }
  const updateComment = (id: number, body: string) => {
    updateCommentApi(
      { id, body, user_id: currentUserId },
      {
        onSuccess: () => {
          // Update the local state to reflect the changes
          setBackendComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === id ? { ...comment, body } : comment,
            ),
          )
          setActiveComment(null)
        },
        onError: (error) => {
          console.error('Failed to update comment', error)
        },
      },
    )
  }
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // console.log('Fetching comments for post ID:', postId) // Debug output
        const data = await getCommentsByPostId(postId)

        // Check if data is an array; if not, wrap it in an array
        const commentsArray = Array.isArray(data) ? data : [data]
        setBackendComments(commentsArray)
      } catch (error) {
        console.error('Failed to fetch comments', error)
      }
    }
    fetchComments()
  }, [postId])

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       console.log('Fetching comments for post ID:', postId) // Debug output
  //       const data = await getCommentsByPostId(postId)
  //       if (Array.isArray(data)) {
  //         setBackendComments(data)
  //       } else {
  //         console.error('Fetched data is not an array:', data)
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch comments', error)
  //     }
  //   }
  //   fetchComments()
  // }, [postId])

  //   const [form, setForm] = useState('')

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>){
  // e.preventDefault()
  // addCommentMutation.mutate(
  //   { body: form,
  //     parent_id
  //   },
  //   {
  //     onSuccess: () => {
  //       window.location.reload()
  //     },
  //   },
  // )
  // setForm('')
  // }

  return (
    <div>
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
              updateComment={updateComment}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
