/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table("users",(t)=>{
    t.string("email").notNullable;
    t.string("password").notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("usrs",(t)=>{
    t.dropColumn("email");
    t.dropColumn("password");
  })
};
