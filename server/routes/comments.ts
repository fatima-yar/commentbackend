import { Router } from 'express'
import * as db from '../db/comments.ts'
import { StatusCodes } from 'http-status-codes'

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

// router.get('/reply', async (req,res, next)=>{
//   try {
//     const replies = await db.getAllReplies()
//     res.json({replies: replies.map((reply)=> reply.body)})
//   }
// })
export default router
