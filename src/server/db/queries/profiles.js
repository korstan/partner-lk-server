const knex = require('../connection');
const mapper = require('../mappers/profiles');

function getSingleProfile(email) {
  return knex('profiles')
    .select('*')
    .where({ email }).first().then((profile) => mapper.getApiObject(profile));
}

function addProfile(profile) {
  return knex('profiles')
    .insert(profile)
    .returning('*');
}

function updateProfile(email, profile) {
    return knex('profiles')
    .update(mapper.getDbObject(profile))
    .where({ email })
    .returning('*');
}

module.exports = {
  getSingleProfile,
  addProfile,
  updateProfile,
};
