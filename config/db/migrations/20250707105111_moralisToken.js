/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("History",(table)=>{
    table.increments('id').primary;
    table.string("tokenAddress");
    table.string("chain").notNullable;
    table.dateTime("created_at").notNull();
    table.datetime('updated_at').nullable();
    table.dateTime("delete_at").nullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable("History");
};
