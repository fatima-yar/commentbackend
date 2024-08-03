import { Comments } from '../../models/comments'
import db from '../db/connection'

export async function getAllComments(): Promise<Comments[]> {
  const comment = await db('comments').select()
  return comment
}
// export async function getAllComments() {
//   const comment = await db('comments')
//     .join('users', 'comments.user_id', 'user.id')
//     .join('replies', 'comments.id', 'replies.parent_id')
//     .select(
//       'comments.id',
//       'comments.user_id',
//       'users.user_name',
//       'users.img_url',
//       'comments.body',
//       'comments.created_at',
//     )
//   return comment as Comments[]
// }

// export async function getAllComments() {
//   const commentsWithReplies = await db('comments')
//     .leftJoin('users as comment_user', 'comments.user_id', 'comment_user.id')
//     .leftJoin('replies', 'comments.id', 'replies.parent_id')
//     .leftJoin('users as reply_user', 'replies.user_id', 'reply_user.id')
//     .select(
//       'comments.id as comment_id',
//       'comments.body as comment_body',
//       'comments.created_at as comment_created_at',
//       'comment_user.user_name as comment_user_name',
//       'comment_user.img_url as comment_user_img_url',
//       'replies.id as reply_id',
//       'replies.body as reply_body',
//       'replies.created_at as reply_created_at',
//       'reply_user.user_name as reply_user_name',
//       'reply_user.img_url as reply_user_img_url'
//     )
//     .orderBy('comments.id', 'asc') // Optional: sort by comment ID if needed
//   return commentsWithReplies
// }
