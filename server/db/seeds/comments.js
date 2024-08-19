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
      body: 'What if a mouse caused the problem?',
      parent_id: null,
      created_at: '2024-08-16T23:00:33.010+02:00',
      post_id: 1,
    },
    {
      id: 2,
      user_id: 2,
      body: 'This is the website!! : https://info.cern.ch/',
      parent_id: null,
      created_at: '2024-02-16T23:00:33.010+02:00',
      post_id: 2,
    },
    {
      id: 3,
      user_id: 2,
      body: 'Probably we would call the bugs, mice and the mouse cockroach',
      parent_id: 1,
      created_at: '2024-01-16T23:00:33.010+02:00',
      post_id: 1,
    },
    {
      id: 4,
      user_id: 3,
      body: 'I clearly remember that!',
      parent_id: 2,
      created_at: '2024-01-16T23:00:33.010+02:00',
      post_id: 2,
    },
  ])
}
