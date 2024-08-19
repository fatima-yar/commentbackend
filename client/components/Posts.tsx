import { useState } from 'react'
import { usePosts, useCommentCount } from '../hooks/useComments'
import Comments from './comments/Comments'
import { Post } from '../../models/post'

export default function Posts() {
  const { data, error, isLoading } = usePosts()
  const [activePostId, setActivePostId] = useState<number | null>(null) // Track active post

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading posts: {error.message}</div>

  const handleCommentsToggle = (postId: number) => {
    // If the clicked post is already active, toggle it off; otherwise, set it as active
    setActivePostId((prevId) => (prevId === postId ? null : postId))
  }

  // Component to display comment count
  function CommentCount({ postId }: { postId: number }) {
    const { data: commentCount, isLoading, error } = useCommentCount(postId)

    if (isLoading) return <span>Loading comment count...</span>
    if (error) return <span>Error loading comment count</span>

    return <span>Comments: {commentCount || 0}</span>
  }

  return (
    <div className="pb-20 pl-4 pr-4 pt-20 lg:pl-20 lg:pr-20">
      <h1 className="mb-16 rounded-xl bg-org bg-opacity-80 pb-8  pt-8 text-center font-mono text-4xl">
        Here are some fun facts about the technology!!
      </h1>
      <ul className="">
        {data &&
          data.map((post: Post) => (
            <li
              key={post.id}
              className="mb-8 rounded-xl bg-gray-100 p-4 font-mono text-lg"
            >
              <div className="my-4 border-b border-gray-700 pb-8">
                {post.content}
              </div>

              <button
                className="flex cursor-pointer rounded-md border-none bg-transparent p-2 hover:scale-105 hover:bg-gray-200"
                onClick={() => handleCommentsToggle(post.id)}
              >
                <img
                  src={activePostId === post.id ? '/c2.png' : '/c1.png'}
                  alt={
                    activePostId === post.id ? 'Hide Comments' : 'Show Comments'
                  }
                  className="h-6 w-6"
                />

                <CommentCount postId={post.id} />
              </button>
              {activePostId === post.id && (
                <Comments currentUserId={1} postId={post.id} />
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}
