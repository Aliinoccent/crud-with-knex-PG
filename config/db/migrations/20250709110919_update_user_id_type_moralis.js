/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('History',(t)=>{
    t.integer("user_id").notNullable().alter();
    t.float("price").nullable().alter()

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('History',(t)=>{
    t.string("user_id").notNullable().alter()
    t.string("price").nullable().alter()
  })
};
