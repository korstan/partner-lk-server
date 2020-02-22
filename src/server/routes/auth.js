const Router = require('koa-router');
const passport = require('koa-passport');
const jwt = require('jwt-simple');
const { registerNewUser } = require('../db/queries/common');
const router = new Router();

const getUserToken = (user) => {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.email, iat: timeStamp }, process.env.SECRET);
};

router.post('/auth/register', async (ctx) => {
  try {
    const { body } = ctx.request;
    const user = { email: body.email, password: body.password };
    const profile = {
      email: body.email,
      lastname: body.lastname,
      firstname: body.firstname,
      patronymic: body.patronymic,
      phone: body.phone,
      organization: body.organization,
      inn: body.inn,
      position: body.position,
    };

    const newUser = await registerNewUser(user, profile);
    ctx.body = { token: getUserToken(newUser[0]) };
    ctx.status = 200;
  } catch (err) {
    switch (err.name) {
      case 'AddUserError':
        ctx.status = 400;
        ctx.body = {
          error: { name: 'EmailError', message: 'Email is already in use' },
        };
        break;
      case 'AddProfileError':
        ctx.status = 400;
        ctx.body = {
          error: { name: 'InnError', message: 'INN is already in use' },
        };
        break;
      default:
        ctx.status = 500;
        ctx.body = {
          error: { name: 'InternalServerError', message: 'Something went wrong on a server' },
        };
        break;
    }
  }
});

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.status = 200;
      ctx.body = { token: getUserToken(user) };
    } else {
      ctx.status = 400;
      ctx.body = { error: {name: 'CredentialsError', message: 'Wrong email or password'} };
    }
  })(ctx);
});

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

module.exports = router;
