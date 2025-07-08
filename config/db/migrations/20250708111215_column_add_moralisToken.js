/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("History",(t)=>{
    t.string("price").nullable();
    t.string("History_created_at").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table("History", function (t) {
    t.dropColumn("price");
    t.dropColumn("History_created_at");
  });
};
