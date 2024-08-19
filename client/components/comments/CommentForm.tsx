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

  const queryClient = useQueryClient()

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
        <textarea
          placeholder="Write a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mb-2 mt-2 w-full  rounded-l  pl-2"
        />
        <button
          className="rounded-md bg-green-300 p-2 text-sm hover:scale-105"
          disabled={isTextareaDisabled}
        >
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="ml-2 rounded-md bg-red-400 p-2 text-sm hover:scale-105"
            onClick={handleCancel}
          >
            𐄂
          </button>
        )}
      </form>
    </>
  )
}
