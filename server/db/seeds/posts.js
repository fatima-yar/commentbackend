/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()

  // Inserts seed entries
  await knex('posts').insert([
    {
      id: 1,
      content:
        '1- The term “bug” to describe a glitch in a system originated when a moth caused a malfunction in an early computer.👾👾',
    },
    {
      id: 2,
      content:
        ' 2-The world’s first website is still online. It was created by Tim Berners-Lee and went live in 1991.🌐',
    },
    {
      id: 3,
      content:
        '3-There are more connected devices on Earth than there are people. The number of connected devices is expected to surpass 25 billion by 2030.🛜💻📲',
    },
    {
      id: 4,
      content:
        '4-The term “Wi-Fi” doesn’t stand for anything. It is a marketing term coined by a branding company.🛜',
    },
    {
      id: 5,
      content:
        'The first-ever email was sent by Ray Tomlinson in 1971. It was sent between two computers that were side by side.📧',
    },
  ])
}
