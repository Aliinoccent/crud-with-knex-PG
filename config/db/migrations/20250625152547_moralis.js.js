/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('moralis',(table)=>{
    table.increments('id').primary()
    table.string('nativeBalance')
    table.string('nftBalance')
    table.string("walletBalance")

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('moralis');
};
