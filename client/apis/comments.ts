import request from 'superagent'
import { Comments, Comments as CommentsInt } from '../../models/comments'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Post } from '../../models/post'

export interface AddComment {
  body: string
  parent_id: number | null
}
export interface UpdateComment {
  id: number
  body: string
  user_id: number
}
const rootUrl = '/api/v1/comments'

export async function getAllComments(postId: number): Promise<string[]> {
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
export function getPosts(): Promise<Post[]> {
  return request.get(rootUrl + '/posts').then((res) => {
    // Ensure the API response structure matches this expectation
    return res.body.posts as Post[]
  })
}
export async function getCommentsByPostId(id: number): Promise<Comments[]> {
  try {
    const res = await request.get(`${rootUrl}/posts/comment/${id}`)

    return res.body as CommentsInt[]
  } catch (error) {
    console.error('Error fetching comments by post ID:', error)
    throw error
  }
}

export async function addComment(
  comment: string,
  parent_id: number | null = null,
  post_id: number,
) {
  // console.log('Api:', comment)
  const newComment = {
    body: comment,
    parent_id: parent_id,
    user_id: 1,
    created_at: new Date().toISOString(),
    post_id: post_id,
  }

  const res = await request.post(rootUrl).send(newComment)
  // console.log('res.body:', res.body)
  return res.body
}

export async function deleteComment(id: number) {
  await request.delete(`${rootUrl}/comments/${id}`)
}

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

export function useUpdateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateComment) => {
      const { id, body, user_id } = data
      await request.patch(`${rootUrl}/${id}`).send({ body, user_id })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onError: (error) => {
      console.error('Failed to update comment', error)
    },
  })
}
// export function useUpdateComment() {
//   const queryClient = useQueryClient()
//   interface Props {
//     id: number
//     body: string
//   }
//   return useMutation({
//     mutationFn: async (data: Props) => {
//       const { id, body } = data
//       console.log('Api body:', body)
//       console.log('Api id:', id)
//       await request.patch(${rootUrl}/${id}).send({ body })
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['comments'] })
//     },
//   })
// }
