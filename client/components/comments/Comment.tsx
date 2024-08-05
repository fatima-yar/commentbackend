import { text } from 'express'
import { CommentData } from './Comments'
import CommentForm from './oldCommentForm'

interface CommentProps {
  comment: CommentData
  replies: CommentData[]
  currentUserId: string
  deleteComment: (commentId: string) => void
  activeComment: ActiveComment | null
  setActiveComment: (comment: ActiveComment | null) => void
  updateComment: (commentId: string) => void
  addComment: (text: string, parentId: string | null) => void
  parentId?: string | null
}

interface ActiveComment {
  id: string
  type: 'replying' | 'editing'
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
  parentId = null,
}) => {
  const canReply = Boolean(currentUserId)
  const canEdit = currentUserId === comment.userId
  const canDelete = currentUserId === comment.userId
  const replyId = parentId ? parentId : comment.id
  const createAt = new Date(comment.createdAt).toLocaleString()

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
          <div className="text-lg text-blue-600">{comment.username}</div>
          <div className="text-xs text-gray-600">{createAt}</div>
        </div>
        {!isEditing && <div className="text-md">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialValue={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
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
            parentId={null}
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
                parentId={comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Comment
