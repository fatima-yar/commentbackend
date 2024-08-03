/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id')
    table.string('koon')
    table.string('body')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}
/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  return knex.schema.dropTable('comments')
}
