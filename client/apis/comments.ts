import request from 'superagent'
import { Comments, Comments as CommentsInt } from '../../models/comments'
import { Post } from '../../models/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

// Fetch all comments
export async function getAllComments(): Promise<Comments[]> {
  const res = await request.get(rootUrl)
  return res.body.comments as Comments[]
}

// Fetch posts
export function getPosts(): Promise<Post[]> {
  return request.get(`${rootUrl}/posts`).then((res) => {
    return res.body.posts as Post[]
  })
}

// Fetch comments by post ID
export async function getCommentsByPostId(id: number): Promise<Comments[]> {
  try {
    const res = await request.get(`${rootUrl}/posts/${id}/comments`)
    return res.body as CommentsInt[]
  } catch (error) {
    console.error('Error fetching comments by post ID:', error)
    throw error
  }
}

// Fetch comment count by post ID
export async function getCommentCountByPostId(id: number): Promise<number> {
  try {
    const res = await request.get(`${rootUrl}/posts/${id}/comments/count`)
    return res.body.count as number
  } catch (error) {
    console.error('Error fetching comment count by post ID:', error)
    throw error
  }
}

// Add a new comment
export async function addComment(
  comment: string,
  parent_id: number | null = null,
  post_id: number,
) {
  const newComment = {
    body: comment,
    parent_id,
    user_id: 1, // Or obtain this from context/session
    created_at: new Date().toISOString(),
    post_id,
  }

  const res = await request.post(rootUrl).send(newComment)
  return res.body
}

// Delete a comment
export async function deleteComment(id: number) {
  await request.delete(`${rootUrl}/${id}`)
}

// Hook for deleting a comment
export function useDeleteComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteComment(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
    onError: (error: any) => {
      console.error('Failed to delete comment', error)
    },
  })
}

// Hook for updating a comment
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
    onError: (error: any) => {
      console.error('Failed to update comment', error)
    },
  })
}
