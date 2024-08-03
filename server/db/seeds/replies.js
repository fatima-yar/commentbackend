/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('replies').del()

  // Inserts seed entries
  await knex('replies').insert([
    {
      id: 1,
      user_id: '1',
      parent_id: '1',
      body: 'I replies the first comment',
      created_at: '2024-08-16T23:00:35.010+02:00',
    },
    {
      id: 1,
      user_id: '1',
      parent_id: '2',
      body: 'This is the second comment replies',
      created_at: '2024-09-16T23:00:33.010+02:00',
    },
    {
      id: 1,
      user_id: '2',
      parent_id: '3',
      body: 'bullshit!!',
      created_at: '2024-10-16T23:00:33.010+02:00',
    },
    {
      id: 1,
      user_id: '3',
      parent_id: '3',
      body: 'who am i?',
      created_at: '2024-11-16T23:00:33.010+02:00',
    },
  ])
}
