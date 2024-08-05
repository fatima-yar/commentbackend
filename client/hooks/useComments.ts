import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getAllComments, getComments } from '../apis/comments.ts'

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

// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useCommentsMutation(addFruit)
} */
