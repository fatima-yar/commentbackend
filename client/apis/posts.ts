import request from 'superagent'

const rootUrl = '/api/v1'

export function getPosts(): Promise<string[]> {
  return request.get(rootUrl + '/posts').then((res) => {
    return res.body.posts
  })
}
