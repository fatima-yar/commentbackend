/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('replies', (table) => {
    table.increments('id')
    table.integer('user_id')
    table.integer('parent_id')
    table.string('body')
    table.string('created_at')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('replies')
}
