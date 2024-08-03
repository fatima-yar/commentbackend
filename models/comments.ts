export interface Comments {
  id: number
  user_id: number
  user_name: string
  img_url: string
  body: string
  created_at: string
}

export interface Replies {
  id: number
  user_id: number
  parent_id: number
  body: string
  created_at: string
}

export interface NewComment {
  id: number
  user_id: number
  user_name: string
  img_url: string
  body: string
  created_at: string
}
export type CommentData = Omit<Comments, 'comments' | 'timestamp'>

export type NewCommentsData = Omit<NewComment, 'comments' | 'timestamp'>
