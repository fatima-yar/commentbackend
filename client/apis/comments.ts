import request from 'superagent'
import { Comments as CommentsInt } from '../../models/comments'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface AddComment {
  body: string
  parent_id: number | null
}
const rootUrl = '/api/v1/comments'

export async function getAllComments(): Promise<string[]> {
  const res = await request.get(rootUrl)
  return res.body.comments
}

// export async function addComment(comment: string, parent_id =null) {
//   const newComment: AddComment = {
//     body: comment,
//     parent_id
//   }
//   await request.post(rootUrl + '/comments').send(newComment)
//   // .auth(token, { type: 'bearer' })
// }

export async function addComment(
  comment: string,
  parent_id: number | null = null,
): Promise<CommentsInt> {
  const newComment = {
    body: comment,
    parent_id: parent_id,
    user_id: '3', // Default userId (if needed)

    created_at: new Date().toISOString(),
  }

  const res = await request.post(rootUrl).send(newComment)
  return res.body.comment // Ensure your backend returns the new comment
  // .auth(token, { type: 'bearer' }) // Uncomment if authentication is needed
}

export async function deleteComment(id: number) {
  await request.delete(`${rootUrl}/comments/${id}`)
}
//Add a comment
// export function useAddComment() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async (data: { body: string, parent_id: number | null }) => {
//       const res = await request.post(rootUrl).send(data)
//       return res.body.comment // Ensure this matches the backend response
//     },
//     onSuccess: (newComment: CommentsInt) => {
//       // Invalidate queries to refresh the comments list after adding a new comment
//       queryClient.invalidateQueries(['comments'])
//     },
//     onError: (error: any) => {
//       console.error('Failed to add comment', error)
//     }
//   })
// }
// Delete a comment

export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`${rootUrl}/${id}`)
    },
    onSuccess: () => {
      // Invalidate the specific query to refresh data after a successful deletion
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onError: (error: any) => {
      console.error('Failed to delete comment', error)
    },
  })
}
