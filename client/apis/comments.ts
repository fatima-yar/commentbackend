import request from 'superagent'
import { Comments } from '../../models/comments'

export interface AddComment {
  body: string
}
const rootUrl = '/api/v1/comments'

export async function getAllComments(): Promise<string[]> {
  const res = await request.get(rootUrl)
  return res.body
}
