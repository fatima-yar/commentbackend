import { Comments as CommentsInt } from '../../../models/comments'

interface CommentProps {
  comment: CommentsInt
  replies: CommentsInt[]
}

interface ActiveComment {
  id: string
  type: 'replying' | 'editing'
}

const Comment: React.FC<CommentProps> = ({ comment, replies }) => {
  return (
    <div className="pl-4 pt-8">
      <div className="flex gap-2">
        <img src={`./${comment.img_url}.png`} alt="icon" width="40px" />
        <div className="text-lg">{comment.user_name}</div>
        <div className="pt-2 text-xs ">{comment.created_at}</div>
      </div>

      <div className="text-lg">{comment.body}</div>

      <div className=" text-gray-600">
        {replies.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {' '}
            {replies.map((reply) => (
              <Comment comment={reply} key={reply.id} replies={[]} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
