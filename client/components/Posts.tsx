import { useState } from 'react'
import { usePosts } from '../hooks/usePosts'
import Comments from './comments/Comments'
import { Post } from '../../models/post'

export default function Posts() {
  const { data, error, loading } = usePosts()
  const [activePostId, setActivePostId] = useState<number | null>(null) // Track active post

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading posts: {error.message}</div>

  const handleCommentsToggle = (postId: number) => {
    // If the clicked post is already active, toggle it off; otherwise, set it as active
    setActivePostId((prevId) => (prevId === postId ? null : postId))
    console.log('Posts.tsx-postd:', postId)
  }

  return (
    <div className="app">
      <h1 className="pb-8 text-xl">
        Here are some Bullshits that I've copied from a random website!
      </h1>
      <ul>
        {data &&
          data.map((post: Post) => (
            <li key={post.id} className="mb-4">
              <div>{post}</div>
              <button
                className="text-red-500"
                onClick={() => handleCommentsToggle(post.id)}
              >
                {activePostId === post.id ? 'Hide Comments' : 'Comments'}
              </button>
              {activePostId === post.id && (
                <Comments currentUserId={1} postId={post.id} /> // Pass postId here
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}
