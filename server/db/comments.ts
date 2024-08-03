import { Comments } from '../../models/comments'
import db from './connection'

export async function getAllComments() {
  const comment = await db('comments')
    .join('users', 'comments.user_id', 'user.id')
    .join('replies', 'comments.id', 'replies.parent_id')
    .select(
      'comments.id',
      'comments.user_id',
      'users.user_name',
      'users.img_url',
      'comments.body',
      'comments.created_at',
    )
  return comment as Comments[]
}
