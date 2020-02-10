const Router = require('koa-router');
const passport = require('koa-passport');
const jwt = require('jwt-simple');
const config = require('../../config');
const { addUser } = require('../db/queries/users');
const { addProfile } = require('../db/queries/profiles');
const router = new Router();

const getUserToken = user => {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.email, iat: timeStamp }, config.SECRET);
};

router.post('/auth/register', async ctx => {
  try {
    const { body } = ctx.request;
    const newUser = await addUser({
      email: body.email,
      password: body.password,
    });

    const profile = await addProfile({
      email: body.email,
      lastname: body.lastname,
      firstname: body.firstname,
      patronymic: body.patronymic,
      phone: body.phone,
      organization: body.organization,
      inn: body.inn,
      position: body.position,
    });

    ctx.body = { token: getUserToken(newUser[0]) };

    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
  }
});

router.post('/auth/login', async ctx => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.status = 200;
      ctx.body = { token: getUserToken(user) };
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

router.get('/auth/logout', async ctx => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = router;
