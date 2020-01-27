
exports.up = function(knex) {
    return knex.schema.createTable('profiles', (table) => {
        table.increments();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('patronimyc');
        table.string('email').notNullable().unique();
        table.string('phone').notNullable();
        table.string('organization').notNullable();
        table.string('inn').notNullable().unique();
        table.string('position').notNullable();
        table.string('org_phone');
        table.string('address_country');
        table.string('address_city');
        table.string('address_street');
        table.string('address_building');
        table.string('address_office');
        table.string('extra_website');
        table.text('extra_about');
        table.text('extra_interests');
        table.binary('extra_logo');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('profiles');
  };
  