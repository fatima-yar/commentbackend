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
    <div className="pl-4 pt-8" key={comment.id}>
      <div className="flex gap-2">
        <img src={`./${comment.img_url}.png`} alt="icon" width="40px" />
        <div className="text-lg">{comment.user_name}</div>
        <div className="pt-2 text-xs ">{createAt}</div>
      </div>

      {!isEditing && <div className="text-lg">{comment.body}</div>}
      {isEditing && (
        <CommentForm
          submitLabel="Update"
          hasCancelButton
          initialValue={comment.body}
          handleSubmit={(text) => updateComment(comment.id, text)}
          handleCancel={() => setActiveComment(null)}
        />
      )}
      <div className="flex gap-2 text-sm text-gray-500">
        {canReply && (
          <button
            onClick={() =>
              setActiveComment({ id: comment.id, type: 'replying' })
            }
          >
            Reply
          </button>
        )}
        {canEdit && (
          <button
            onClick={() =>
              setActiveComment({ id: comment.id, type: 'editing' })
            }
          >
            Edit
          </button>
        )}
        {canDelete && (
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        )}
      </div>
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          handleSubmit={(text: string) => addComment(text, replyId)}
          hasCancelButton={false}
        />
      )}

      <div className=" text-gray-600">
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
