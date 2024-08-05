import { FormEvent, useEffect, useState } from 'react'

interface CommentFormProps {
  handleSubmit: (text: string) => void
  submitLabel: string
  parentId?: string | null
  hasCancelButton: boolean
  handleCancel: () => void
  initialValue?: string
}
export default function newCommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  parent_id,
  initialValue = '',
}: CommentFormProps) {
  const [text, setText] = useState(initialValue)
  const isTextareaDisabled = text.length === 0

  useEffect(() => {
    setText(initialValue)
  }, [initialValue])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(text)
    setText('')
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <button
          className="rounded-md bg-green-500 p-2"
          disabled={isTextareaDisabled}
        >
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button type="button" className="bg-red-400" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>
    </>
  )
}
