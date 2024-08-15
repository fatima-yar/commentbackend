import { Router } from 'express'

import * as db from '../db/posts.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPosts()

    res.json({ posts })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const post = await db.getPostById(Number(req.params.id))
    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
