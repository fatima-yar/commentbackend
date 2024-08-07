import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useEffect, useState } from 'react'
import { addComment } from '../../apis/comments'
interface CommentFormProps {
  handleSubmit: (text: string) => void
  submitLabel: string
  parent_id?: number | null
  hasCancelButton: boolean
  handleCancel: () => void
  initialValue?: string
}

export default function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  parent_id,
  initialValue = '',
}: CommentFormProps) {
  const [text, setText] = useState(initialValue)
  const isTextareaDisabled = text.length === 0

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text.trim() === '') return
    handleSubmit(text) // Pass the text to handleSubmit
    setText('')
  }

  useEffect(() => {
    setText(initialValue)
  }, [initialValue])
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
