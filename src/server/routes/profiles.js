const Router = require('koa-router');
const queries = require('../db/queries/profiles');

const router = new Router();
const BASE_URL = `/api/v1/profiles`;

router.get(BASE_URL, async ctx => {
  try {
    const profiles = await queries.getAllProfiles();
    ctx.body = {
      status: 'success',
      data: profiles,
    };
  } catch (err) {
    console.log(err);
  }
});

router.get(`${BASE_URL}/:inn`, async ctx => {
  try {
    const profile = await queries.getSingleProfile(ctx.params.inn);
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
});

router.post(`${BASE_URL}`, async ctx => {
  try {
    const profile = await queries.addProfile(ctx.request.body);
    if (profile.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: profile,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something is wrong with request body',
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'An error has occured.',
    };
  }
});

router.put(`${BASE_URL}/:inn`, async ctx => {
    try {
      const profile = await queries.updateProfile(ctx.params.inn, ctx.request.body);
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
  });

module.exports = router;
