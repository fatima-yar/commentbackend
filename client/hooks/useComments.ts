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

// Custom hook for mutation
export function useCommentsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      // Ensure queryKey matches the one used in the fetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  return mutation
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
