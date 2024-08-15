import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../apis/posts'
import { Post } from '../../models/post' // Ensure this path is correct

export function usePosts() {
  const query = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return {
    ...query,
  }
}
