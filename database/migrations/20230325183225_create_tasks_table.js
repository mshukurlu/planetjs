/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 return knex.schema.createTable('tasks',function(table){
    table.increments('id').primary()
    table.integer('user_id').index()
    table.string('title','300');
    table.text('description');
    table.string('status');
    table.dateTime('created_at').defaultTo(knex.fn.now())
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
