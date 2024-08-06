import request from 'superagent'
import { Comments as CommentsInt } from '../../models/comments'

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
