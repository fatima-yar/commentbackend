import { comment } from 'postcss'
import {
  Comments,
  NewComment,
  NewCommentsData,
  Replies,
} from '../../models/comments'
import db from '../db/connection'

// export async function getAllComments(): Promise<Comments[]> {
//   const comment = await db('comments').select()
//   return comment
// }

export async function getCommentsById(id: number | string) {
  const comment = await db('comments').select().first().where({ id })
  return comment as Comment
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

export async function getAllComments() {
  const commentsWithReplies = await db('comments')
    .leftJoin('users as comment_user', 'comments.user_id', 'comment_user.id')
    .leftJoin('replies', 'comments.id', 'replies.parent_id')
    .leftJoin('users as reply_user', 'replies.user_id', 'reply_user.id')
    .select(
      'comments.id as comment_id',
      'comments.body as comment_body',
      'comments.created_at as comment_created_at',
      'comment_user.user_name as comment_user_name',
      'comment_user.img_url as comment_user_img_url',
      'replies.id as reply_id',
      'replies.body as reply_body',
      'replies.created_at as reply_created_at',
      'reply_user.user_name as reply_user_name',
      'reply_user.img_url as reply_user_img_url',
    )
  // .orderBy('comments.id', 'asc') // Optional: sort by comment ID if needed
  return commentsWithReplies as Comments[]
}

// export async function getAllReplies() {
//   const replies = await db('replies')
//     .join('comments', 'comments.id', 'replies.parent_id')
//     .select()
//   return replies as Replies[]
// }

export async function addComment(newComment: NewCommentsData) {
  const res = await db('comments').insert(newComment)
  return res
}

export async function editComment(updatedComment: NewComment) {
  const { id, user_id, user_name, img_url, body, created_at } = updatedComment
  return db('comments')
    .where({ id })
    .update({ user_id, user_name, img_url, body, created_at })
}

export async function deleteComment(id: number) {
  return db('comments').where({ id }).delete()
}

export async function updateComment(id: number, body: Record<string, any>) {
  return db('comments').where({ id }).update(body)
}
