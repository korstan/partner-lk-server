const Router = require('koa-router');
const passport = require('koa-passport');
const queries = require('../db/queries/users');

const router = new Router();

router.post('/auth/register', async ctx => {
  const user = await queries.addUser(ctx.request.body);
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.status = 200;
      ctx.body = {status: 'success (cookies sent)'}
      return ctx.login(user);
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

router.post('/auth/login', async ctx => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.status = 200;
      ctx.body = {status: 'success (cookies sent)'}
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
