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
        'will create a sample knexfile.js - the file which contains our various database configurations. Once you have a knexfile.js, you can use the migration tool to create migration files to the specified directory (default migrations). Creating new migration files can be achieved by running:',
    },
    {
      id: 2,
      content:
        '    you can also create your migration using a specific stub file, this serves as a migration template to speed up development for common migration operations',
    },
    {
      id: 3,
      content:
        'ing app that includes CRUD operations for fruit. It has the beginnings of authentication such as a <Nav> component with buttons for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.',
    },
    {
      id: 4,
      content:
        'will create a sample knexfile.js - the file which contains our various database configurations. Once you have a knexfile.js, you can use the migration tool to create migration files to the specified directory (default migrations). Creating new migration files can be achieved by running:',
    },
    {
      id: 5,
      content:
        'ing app that includes CRUD operations for fruit. It has the beginnings of authentication such as a <Nav> component with buttons for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.',
    },
  ])
}
