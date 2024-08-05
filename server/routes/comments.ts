import { Router } from 'express'
import * as db from '../db/comments.ts'
import { StatusCodes } from 'http-status-codes'
import { AddComment } from '../../models/comments.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const comments = await db.getAllComments()
    res.json({ comments: comments })
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
    await db.addComment(newComment)
    res.sendStatus(201)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
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
    const updatedComment = req.body
    console.log(updatedComment)
    await db.updateComment(id, updatedComment)
    res.sendStatus(200)
  } catch (error) {
    console.error(`database error: ${error}`)
    res.sendStatus(500)
  }
})

export default router
