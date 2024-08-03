import { Comments } from '../../models/comments'
import db from './connection'

export async function getAllComments() {
  const commentsWithReplies = await db('comments')
    .leftJoin('users as comment_user', 'comments.user_id', 'comment_user.id')
    .leftJoin('replies', 'comments.id', 'replies.parent_id')
    .leftJoin('users as reply_user', 'replies.user_id', 'reply_user.id')
    .select(
      'comments.id as comment_id',
      'comments.body  as comment_body',
      'comments.created_at as comment_created_at',
      'users.user_name as comment_user_name',
      'users.img_url as comment_img_url',
      'replies.id as reply_id',
      'replies.body as reply_body',
      'replies.created_at as reply_created_at',
      'reply_user.user_name as reply-user_name',
      'reply_user.img_url as reply_user_img_url',
    )
  return commentsWithReplies as Comments[]
}
