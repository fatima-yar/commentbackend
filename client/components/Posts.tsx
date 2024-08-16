import { useState } from 'react'
import { usePosts } from '../hooks/useComments'
import Comments from './comments/Comments'
import { Post } from '../../models/post'
import { comment } from 'postcss'

export default function Posts() {
  const { data, error, loading } = usePosts()
  const [activePostId, setActivePostId] = useState<number | null>(null) // Track active post

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading posts: {error.message}</div>

  const handleCommentsToggle = (postId: number) => {
    // If the clicked post is already active, toggle it off; otherwise, set it as active
    setActivePostId((prevId) => (prevId === postId ? null : postId))
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
              <div>{post.content}</div>
              <button
                className="flex cursor-pointer border-none bg-transparent p-1"
                onClick={() => handleCommentsToggle(post.id)}
              >
                <img
                  src={activePostId === post.id ? '/c2.png' : '/c1.png'}
                  alt={
                    activePostId === post.id ? 'Hide Comments' : 'Show Comments'
                  }
                  className="h-6 w-6" // Adjust size as needed
                />
                Comments
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
