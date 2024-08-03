import request from 'superagent'

const rootUrl = '/api/v1'

export function getComments(): Promise<string[]> {
  return request.get(rootUrl + '/comments').then((res) => {
    return res.body.comments
  })
}
