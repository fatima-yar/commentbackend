import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getAllComments, getComments, getPosts } from '../apis/comments.ts'
import { Post } from '../../models/post.ts'

export function useComments() {
  const query = useQuery({ queryKey: ['comments'], queryFn: getAllComments })
  return {
    ...query,
  }
}

export function useCommentsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Comments'] })
    },
  })

  return mutation
}
export function usePosts() {
  const query = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return {
    ...query,
  }
}
// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useCommentsMutation(addFruit)
} */
