import { comment } from 'postcss'
import {
  Comments,
  NewComment,
  NewCommentsData,
  AllComments,
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

// }
export async function getAllComments() {
  const commentsWithReplies = await db('comments')
    .join('users', 'users.id', 'comments.user_id')
    .select(
      'comments.id as id',
      'comments.user_id as user_id',
      'comments.body as body',
      'users.user_name as user_name',
      'users.img_url as img_url',
      'comments.parent_id as parent_id',
      'comments.created_at as created_at',
    )
  // .orderBy('comments.created_at', 'desc')
  return commentsWithReplies as Comments[]
}

export async function addComment(newComment: NewCommentsData) {
  const res = await db('comments').insert(newComment)
  return res
}

export async function editComment(updatedComment: NewComment) {
  const { id, user_id, body, parent_id, created_at } = updatedComment
  return db('comments')
    .where({ id })
    .update({ user_id, body, parent_id, created_at })
}

export async function deleteComment(id: number) {
  return db('comments').where({ id }).delete()
}

export async function updateComment(id: number, body: Record<string, any>) {
  return db('comments').where({ id }).update(body)
}
