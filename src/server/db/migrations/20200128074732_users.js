exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments();
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('password').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
