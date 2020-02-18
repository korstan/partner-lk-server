const knex = require('../connection');
const mapper = require('../mappers/profiles');

function getSingleProfile(email) {
  return knex('profiles')
    .select('*')
    .where({ email })
    .first()
    .then((profile) => mapper.getApiObject(profile));
}

function addProfile(profile) {
  try {
    return knex('profiles')
      .insert(profile)
      .returning('*');
  } catch (error) {
    throw { name: 'AddProfileError', message: error.message };
  }
}

function updateProfile(email, profile) {
  try {
    return knex('profiles')
      .update(mapper.getDbObject(profile))
      .where({ email })
      .returning('*');
  } catch (error) {
    throw { name: 'UpdateProfileError', message: error.message };
  }
}

module.exports = {
  getSingleProfile,
  addProfile,
  updateProfile,
};
