const knex = require('../connection');

const userQuery = require('./users');
const profileQuery = require('./profiles');

function registerNewUser(user, profile) {
  return knex.transaction(async (trx) => {
    try {
      const newUser = await userQuery
        .addUser(user)
        .transacting(trx)
        .catch((error) => {
          throw { name: 'AddUserError', message: error.message };
        });
      await profileQuery
        .addProfile(profile)
        .transacting(trx)
        .catch((error) => {
          throw { name: 'AddProfileError', message: error.message };
        });
      return newUser;
    } catch (error) {
      throw error;
    }
  });
}

module.exports = {
  registerNewUser,
};
