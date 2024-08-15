export interface Comments {
  id: number
  user_id: number
  body: string
  user_name: string
  img_url: string
  parent_id: number | null
  created_at: string
  post_id: string
}
export interface NewComment {
  id: number
  user_id: number
  body: string
  user_name: string
  img_url: string
  parent_id: number
  created_at: string
}

export type CommentData = Omit<Comments, 'comments' | 'timestamp'>

// export type NewCommentData = Omit<NewComment, 'comments' | 'timestamp'>
export type NewCommentData = Omit<Comments, 'id'>
