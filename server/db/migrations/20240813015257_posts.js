/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id')
    table.string('content')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('posts')
}
