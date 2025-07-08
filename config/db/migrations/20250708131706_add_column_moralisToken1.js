/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('History',(t)=>{
    t.string("user_id").notNullable();
    t.string("tokenName").notNullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("History",(t)=>{
    t.dropColumn("user_id");
    t.dropColumn("tokenName");
  })
};
