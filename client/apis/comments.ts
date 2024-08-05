import request from 'superagent'
import { Comments } from '../../models/comments'

export interface AddComment {
  body: string
}
const rootUrl = '/api/v1'

export function getComments(): Promise<string[]> {
  return request.get(rootUrl + '/comments').then((res) => {
    return res.body.comments
  })
}
