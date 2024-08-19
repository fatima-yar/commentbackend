import { Comments as CommentsInt } from '../../../models/comments'
import CommentForm from './CommentForm'

interface CommentProps {
  comment: CommentsInt
  replies: CommentsInt[]
  currentUserId: number
  parent_id?: number | null
  deleteComment: (commentId: number) => void
  activeComment: ActiveComment | null
  setActiveComment: (comment: ActiveComment | null) => void
  updateComment: (commentId: number, text: string) => void
  addComment: (text: string, parent_id: number | null) => void
}

interface ActiveComment {
  id: number
  type: 'replying' | 'editing'
}

const Comment: React.FC<CommentProps> = ({
  comment,
  replies,
  currentUserId,
  parent_id = null,
  deleteComment,
  updateComment,
  addComment,
  activeComment,
  setActiveComment,
}) => {
  const canReply = Boolean(currentUserId)
  const canEdit = currentUserId === comment.user_id
  const canDelete = currentUserId === comment.user_id
  const replyId = parent_id ? parent_id : comment.id
  const createAt = new Date(comment.created_at).toLocaleString()
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'replying'

  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'editing'
  return (
    <div className="pb-4 pl-2 pr-2 pt-4" key={comment.id}>
      <div className="mb-2 mt-6   flex items-start gap-2">
        <img
          className="pb-2"
          src={`./${comment.img_url}.png`}
          alt="icon"
          width="40px"
        />
        <div className="flex flex-col justify-center">
          <div className="text-lg">{comment.user_name}</div>
          <div className="pb-2 pt-1 text-xs text-gray-500">{createAt}</div>
        </div>
      </div>

      {!isEditing && (
        <div className="rounded-lg bg-gray-300 p-2 text-lg lg:w-[50%]">
          {comment.body}
        </div>
      )}
      {isEditing && (
        <CommentForm
          submitLabel="✓"
          hasCancelButton
          initialValue={comment.body}
          handleSubmit={(text) => updateComment(comment.id, text)}
          handleCancel={() => setActiveComment(null)}
        />
      )}
      <div className="flex gap-2 text-sm ">
        {canReply && (
          <button
            className="mt-2 rounded-md bg-green-300 p-2 text-sm hover:scale-105"
            onClick={() =>
              setActiveComment({ id: comment.id, type: 'replying' })
            }
          >
            Reply
          </button>
        )}
        {canEdit && (
          <button
            className="mt-2 rounded-md bg-orange-300 p-2 text-sm hover:scale-105"
            onClick={() =>
              setActiveComment({ id: comment.id, type: 'editing' })
            }
          >
            Edit
          </button>
        )}
        {canDelete && (
          <button
            className="mt-2 rounded-md bg-red-400 p-2 text-sm hover:scale-105"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        )}
      </div>
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          handleSubmit={(text: string) => addComment(text, replyId)}
          hasCancelButton={false}
        />
      )}

      <div className="">
        {replies.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {' '}
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                replies={[]}
                currentUserId={currentUserId}
                deleteComment={deleteComment}
                addComment={addComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                updateComment={updateComment}
                parent_id={comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
