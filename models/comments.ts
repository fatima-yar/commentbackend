export interface Comments {
  id: string
  user_id: string
  body: string
  user_name: string
  img_url: string
  parent_id: string | null
  created_at: string
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

export type NewCommentsData = Omit<NewComment, 'comments' | 'timestamp'>
