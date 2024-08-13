// import db from './connection.ts'
// import { Fruit, FruitData } from '../../models/fruit.ts'

// export async function getAllFruits() {
//   const fruit = await db('fruit').select('fruit.owner')
//   return fruit as Fruit[]
// }

// export async function getFruitById(id: number | string) {
//   const fruit = await db('fruit').select().first().where({ id })
//   return fruit as Fruit
// }

// export async function addFruit(data: FruitData) {
//   const [id] = await db('fruit').insert(data)
//   return id
// }

import connection from './connection.ts'
import { Fruit } from '../../models/fruit.ts'

export async function getAllFruits(db = connection): Promise<Fruit[]> {
  return db('fruit').select()
}
