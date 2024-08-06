import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment, AddComment as addCommmentApi } from '../../apis/comments'

export default function AddComments() {
  const queryClient = useQueryClient()

  interface MutationProps {
    body: string
    parent_id: number | null
  }

  const addCommentMutation = useMutation({
    mutationFn: async (props: MutationProps) => {
      return addComment(props.body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments'],
      })
    },
  })
  const [form, setForm] = useState('')
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm(event.target.value)

    // console.log(event.target.value)
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(form)
    addCommentMutation.mutate({
      body: form,
      parent_id: null,
    })
    setForm('')
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">
          <h3 className="">Add A New Book:</h3>{' '}
        </label>

        <input
          onChange={(e) => handleChange(e)}
          id="body"
          name="body"
          className=""
          aria-label="input new comment"
          placeholder="write a comment"
          value={form}
          style={{
            width: '100%',
            maxWidth: '400px',
            height: '40px',
            boxSizing: 'border-box',
          }}
        />

        <br></br>
        <input className="button" type="submit" value="Submit" />
      </form>
    </>
  )
}
