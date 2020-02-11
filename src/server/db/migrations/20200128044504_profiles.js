
exports.up = function(knex) {
    return knex.schema.createTable('profiles', (table) => {
        table.increments();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('patronymic');
        table.string('email').notNullable().unique();
        table.string('phone').notNullable();
        table.string('organization').notNullable();
        table.string('inn').notNullable().unique();
        table.string('position').notNullable();
        table.string('contact_phone');
        table.string('contact_address');
        table.string('contact_country');
        table.string('contact_city');
        table.string('contact_street');
        table.string('contact_building');
        table.string('contact_office');
        table.string('extra_website');
        table.text('extra_about');
        table.text('extra_interests');
        table.binary('extra_logo');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('profiles');
  };
  