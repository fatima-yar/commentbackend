/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()

  // Inserts seed entries
  await knex('comments').insert([
    {
      id: 1,
      user_id: 1,
      body: 'This is the first comment',
      parent_id: null,
      created_at: '2024-08-16T23:00:33.010+02:00',
    },
    {
      id: 2,
      user_id: 2,
      body: 'This is the second comment',
      parent_id: null,
      created_at: '2024-09-16T23:00:33.010+02:00',
    },
    {
      id: 3,
      user_id: 2,
      body: 'I wanna reply the first comment',
      parent_id: 1,
      created_at: '2024-10-16T23:00:33.010+02:00',
    },
    {
      id: 4,
      user_id: 3,
      body: 'I wanna reply the second comment',
      parent_id: 2,
      created_at: '2024-11-16T23:00:33.010+02:00',
    },
  ])
}
