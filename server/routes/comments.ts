import { Router } from 'express'
import * as db from '../db/comments.ts'
import { StatusCodes } from 'http-status-codes'
import { AddComment } from '../../models/comments.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const comments = await db.getAllComments()
    res.json({ comments: comments.reverse() })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

//posts:
router.get('/posts', async (req, res) => {
  try {
    const posts = await db.getAllPosts()

    res.json({ posts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await db.getPostById(Number(req.params.id))
    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/posts/comment/:post_id', async (req, res) => {
  try {
    const commentByPostId = await db.getCommentsByPostId(
      Number(req.params.post_id),
    )
    res.json([commentByPostId]) //Update Wrap in an array
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const comment = await db.getCommentsById(req.params.id)
    res.json(comment)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newComment = req.body
    const insertedComment = await db.addComment(newComment)

    res.status(201).json(insertedComment) // Send response
  } catch (error) {
    console.error(`database error: ${error}`)
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error')
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteComment(id)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updatedComment = req.body.body
    console.log('Updating comment with ID:', id)
    console.log('Update data:', updatedComment)

    await db.updateComment(id, updatedComment)

    res.sendStatus(200)
  } catch (error) {
    console.error(`Database error: ${error}`)
    res.sendStatus(500)
  }
})
export default router
