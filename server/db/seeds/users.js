/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, user_name: 'Fatima', img_url: './1' },
    { id: 2, user_name: 'Rob', img_url: './2' },
    { id: 3, user_name: 'Slayer', img_url: './3' },
  ])
}
