const Router = require('koa-router');
const passport = require('koa-passport');
const { addUser: queryAddUser } = require('../db/queries/users');
const { addProfile: queryAddProfile } = require('../db/queries/profiles');
const router = new Router();

router.post('/auth/register', async ctx => {
  try {
    const { body } = ctx.request;
    await queryAddUser({
      email: body.email,
      password: body.password,
    });

    const profile = await queryAddProfile({
      email: body.email,
      lastname: body.lastname,
      firstname: body.firstname,
      patronymic: body.patronymic,
      phone: body.phone,
      organization: body.organization,
      inn: body.inn,
      position: body.position,
    });

    return passport.authenticate('local', (err, user, info, status) => {
      if (user) {
        ctx.status = 200;
        ctx.body = user;
        return ctx.login(user);
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);
  } catch(err) {
    console.log(err);
    ctx.status = 500;
  }
});

router.post('/auth/login', async ctx => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.status = 200;
      ctx.body = user;
      return ctx.login(user);
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
