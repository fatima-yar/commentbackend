/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('img_url')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
