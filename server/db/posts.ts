import connection from './connection.ts'
import { Post } from '../../models/post.ts'

export async function getAllPosts(db = connection): Promise<Post[]> {
  return db('Posts').select()
}
