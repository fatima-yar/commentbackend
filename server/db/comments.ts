import { comment } from 'postcss'
import { Comments, NewComment, NewCommentData } from '../../models/comments'
import db from '../db/connection'
import { Post } from '../../models/post'

export async function getCommentsById(id: number | string) {
  const comment = await db('comments').select().first().where({ id })
  return comment as Comment
}

// }
export async function getAllComments() {
  const commentsWithReplies = await db('comments')
    .join('users', 'users.id', 'comments.user_id')
    .join('posts', 'posts.id', 'comments.post_id')
    .select(
      'comments.id as id',
      'comments.user_id as user_id',
      'comments.body as body',
      'users.user_name as user_name',
      'users.img_url as img_url',
      'comments.parent_id as parent_id',
      'comments.created_at as created_at',
      'comments.post_id as post_id',
    )

  // .orderBy('comments.created_at', 'desc')
  return commentsWithReplies as Comments[]
}

export async function getAllPosts() {
  const allPosts = await db('posts').select('posts.id', 'posts.content')
  return allPosts as Post[]
}
export async function getPostById(id: number | string) {
  const post = await db('posts').select().first().where({ id })
  return post as Post[]
}

export async function getCommentsByPostId(post_id: number) {
  const commentsByPostId = await db('comments')
    .join('users', 'users.id', 'comments.user_id')
    .join('posts', 'posts.id', 'comments.post_id')
    .select(
      'comments.id as id',
      'comments.user_id as user_id',
      'comments.body as body',
      'users.user_name as user_name',
      'users.img_url as img_url',
      'comments.parent_id as parent_id',
      'comments.created_at as created_at',
      'comments.post_id as post_id',
    )
    // .first()
    .where('comments.post_id', post_id)
  console.log(commentsByPostId)
  return commentsByPostId as Comments[]
}

export async function addComment(newComment: NewCommentData) {
  // Insert the new comment and get its ID
  const [id] = await db('comments').insert(newComment)

  // Fetch the inserted comment along with user information
  const insertedComment = await db('comments')
    .join('users', 'users.id', 'comments.user_id')
    // .join('posts', 'posts.id', 'comments.post_id')
    .select(
      'comments.id as id',
      'comments.user_id as user_id',
      'comments.body as body',
      'users.user_name as user_name',
      'users.img_url as img_url',
      'comments.parent_id as parent_id',
      'comments.created_at as created_at',
      'comments.post_id as post_id',
    )
    .where('comments.id', id)
    .first()

  // Log the inserted comment with user information
  console.log('insertedComment:', insertedComment)

  return insertedComment
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
  return db('comments').where({ id }).update({ body })
}
