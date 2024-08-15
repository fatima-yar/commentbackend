import connection from './connection.ts'
import db from '../db/connection'
import { Post } from '../../models/post.ts'

// export async function getAllPosts(db = connection): Promise<Post[]> {
//   return db('Posts').select()
// }

export async function getAllPosts() {
  const allPosts = await db('posts').select('posts.id', 'posts.content')
  return allPosts as Post[]
}
export async function getPostById(id: number | string) {
  const post = await db('posts').select().first().where({ id })
  return post as Post[]
}
