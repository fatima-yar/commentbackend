import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import {
  getAllComments,
  getCommentsByPostId,
  getPosts,
  getCommentCountByPostId,
} from '../apis/comments.ts'
import { Post } from '../../models/post.ts'
import { Comments } from '../../models/comments.ts'

// Fetch all comments
export function useComments() {
  const query = useQuery({
    queryKey: ['comments'],
    queryFn: getAllComments,
  })
  return {
    ...query,
  }
}

// Define type for variables including post_id
interface CommentMutationVariables {
  body: string
  parent_id: number | null
  post_id: number
}

// Custom hook for mutation
export function useCommentsMutation<TData = unknown>(
  mutationFn: MutationFunction<TData, CommentMutationVariables>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate comments query to refetch all comments
      queryClient.invalidateQueries({ queryKey: ['comments'] })

      // Invalidate the comment count for the specific post
      queryClient.invalidateQueries({
        queryKey: ['commentCount', variables.post_id],
      })
    },
    onError: (error: any) => {
      console.error('Failed to perform mutation', error)
    },
  })
}

// Fetch comments by post ID
export function useCommentByPostId(postId: number) {
  const query = useQuery<Comments[]>({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId),
  })
  return {
    ...query,
  }
}

// Fetch comment count by post ID
export function useCommentCount(postId: number) {
  const query = useQuery<number>({
    queryKey: ['commentCount', postId],
    queryFn: () => getCommentCountByPostId(postId),
  })

  return {
    ...query,
  }
}

// Fetch all posts
export function usePosts() {
  const query = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return {
    ...query,
  }
}
