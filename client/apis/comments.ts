import request from 'superagent'
import { Comments as CommentsInt } from '../../models/comments'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface AddComment {
  body: string
  parent_id: number | null
  user_id: number
}
const rootUrl = '/api/v1/comments'

export async function getAllComments(): Promise<string[]> {
  const res = await request.get(rootUrl)
  return res.body.comments
}

export async function addComment(
  comment: string,
  parent_id = null,
  user_id: number,
) {
  const newComment: AddComment = {
    body: comment,
    parent_id,
    user_id: user_id,
  }
  await request.post(rootUrl + '/comments').send(newComment)
  // .auth(token, { type: 'bearer' })
}

// Example API function
// export async function addComment(
//   body: string,
//   parent_id: number | null,
//   user_id: number,
// ) {
//   const response = await fetch('/api/comments', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ body, parent_id, user_id }),
//   })
//   if (!response.ok) {
//     throw new Error('Network response was not ok.')
//   }
//   return response.json() // Adjust this based on your API response format
// }

// export async function addComment(
//   comment: string,
//   parent_id: number | null = null,
// ) {
//   const newComment = {
//     body: comment,
//     parent_id: parent_id,
//     user_id: '3', // Default userId (if needed)

//     created_at: new Date().toISOString(),
//   }
//   // await request.post(rootUrl).send(newComment)
//   const res = await request.post(rootUrl).send(newComment)
//   return res.body.comment
//   // .auth(token, { type: 'bearer' }) // Uncomment if authentication is needed
// }

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
