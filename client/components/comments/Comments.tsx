import { useEffect, useState } from 'react'
import { Comments as CommentsInt } from '../../../models/comments'
import {
  getAllComments,
  addComment as addCommentApi,
  useDeleteComment,
  useUpdateComment,
} from '../../apis/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateComment } from '../../../server/db/comments'
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
  const { mutate: updateCommentApi } = useUpdateComment(
    id,
    body,
    setBackendComments,
  )

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
  const updateComment = (id: number, body: string) => {
    console.log('Component:', body)
    // updateCommentApi(
    //   { id, body, user_id: currentUserId },
    //   {
    //     onSuccess: () => {
    //       setBackendComments((prevComments) =>
    //         prevComments.map((comment) =>
    //           comment.id === id ? { ...comment, body } : comment,
    //         ),
    //       )
    //       setActiveComment(null)
    //     },
    //     onError: (error: unknown) => {
    //       console.error('Failed to update comment', error)
    //     },
    //   },
    // )
    updateCommentApi({ id, body })
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
              updateComment={updateComment}
              setBackendComments={setBackendComments}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
