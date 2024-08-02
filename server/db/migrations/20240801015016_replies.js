/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('replies', (table) => {
    table.increments('id')
    table.string('body')
    table.string('created_at')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('replies')
}
