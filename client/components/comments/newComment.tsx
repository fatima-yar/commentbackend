import { Comments } from '../../../models/comments'
import CommentForm from './CommentForm'

interface ActiveComment {
  id: string
  type: 'replying' | 'editing'
}
interface CommentProps {
  comment: Comments
  replies: Comments[]
  currentUserId: string
  deleteComment: (commentId: string) => void
  activeComment: ActiveComment | null
  setActiveComment: (comment: ActiveComment | null) => void
  updateComment: (commentId: string) => void
  addComment: (text: string, parent_id: string | null) => void
  parent_id?: string | null
}
const Comment: React.FC<CommentProps> = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  updateComment,
  addComment,
  activeComment,
  setActiveComment,
  parent_id = null,
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
    <>
      <div key={comment.id}>
        <div className="w-10">
          <img src="./user.png" alt="user" />
        </div>
        <div className="commentcontent">
          <div className="text-lg text-blue-600">{comment.user_name}</div>
          <div className="text-xs text-gray-600">{createAt}</div>
        </div>
        {!isEditing && <div className="text-md">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialValue={comment.body}
            handleSubmit={(text: string) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="flex gap-2 text-xs text-gray-400">
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
            handleSubmit={(text) => addComment(text, replyId)}
            hasCancelButton={false}
            handleCancel={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        )}
        {/* {isEditing && (
        <CommentForm
          submitLabel="Save"
          handleSubmit={(text) => {
            updateCommentApi(comment.id, text)
              .then(() => {
                // Handle successful update
                setActiveComment(null)
              })
              .catch((error) => {
                console.error('Failed to update comment', error)
              })
          }}
          parent_id={null}
          initialValue={comment.body}
        />
      )} */}
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
    </>
  )
}
