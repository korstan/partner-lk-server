const knex = require('../connection');

function getAllProfiles() {
  return knex('profiles').select('*');
}

function getSingleProfile(inn) {
  return knex('profiles')
    .select('*')
    .where({ inn });
}

function addProfile(profile) {
  return knex('profiles')
    .insert(profile)
    .returning('*');
}

function updateProfile(inn, profile) {
    return knex('profiles')
    .update(profile)
    .where({ inn })
    .returning('*');
}

module.exports = {
  getAllProfiles,
  getSingleProfile,
  addProfile,
  updateProfile,
};
