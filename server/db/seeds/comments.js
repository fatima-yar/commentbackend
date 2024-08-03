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
      created_at: '2024-08-16T23:00:33.010+02:00',
    },
    {
      id: 1,
      user_id: 2,
      body: 'This is the second comment',
      created_at: '2024-09-16T23:00:33.010+02:00',
    },
    {
      id: 1,
      user_id: 2,
      body: 'me again the third comment',
      created_at: '2024-10-16T23:00:33.010+02:00',
    },
    {
      id: 1,
      user_id: 3,
      body: 'This is the forth comment',
      created_at: '2024-11-16T23:00:33.010+02:00',
    },
  ])
}
