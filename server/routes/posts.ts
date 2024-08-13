import { Router } from 'express'

import * as db from '../db/posts.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const posts = await db.getAllPosts()

    res.json({ posts: posts.map((post) => post.content) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
