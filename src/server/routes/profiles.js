const Router = require('koa-router');
const queries = require('../db/queries/profiles');

const router = new Router();
const BASE_URL = `/api/profiles`;

router.get(`${BASE_URL}`, async ctx => {
  console.log(ctx.req.user);
  if (ctx.isAuthenticated()) {
    try {
      const profile = await queries.getSingleProfile(ctx.params.email);
      if (profile.length) {
        ctx.body = {
          status: 'success',
          data: profile,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'That profile does not exist.',
        };
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      status: 'error',
      message: 'Authentication failed',
    };
  }
});

router.put(`${BASE_URL}/:email`, async ctx => {
  if (ctx.isAuthenticated()) {
    try {
      const profile = await queries.updateProfile(
        ctx.params.email,
        ctx.request.body,
      );
      if (profile.length) {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          data: profile,
        };
      } else {
        ctx.status = 404;
        ctx.body = {
          status: 'error',
          message: 'This profile does not exist',
        };
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message || 'An error has occured.',
      };
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      status: 'error',
      message: 'Authentication failed',
    };
  }
});

module.exports = router;
