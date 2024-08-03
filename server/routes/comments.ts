import { Router } from 'express'
import * as db from '../db/comments.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const comments = await db.getAllComments()
    res.json({ comments: comments.map((comment) => comment.body) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
export default router
