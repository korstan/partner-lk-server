const Router = require('koa-router');
const { getSingleProfile, updateProfile } = require('../db/queries/profiles');
const profilesMapper = require('../db/mappers/profiles');
const passport = require('koa-passport');
const router = new Router();
const BASE_URL = `/api/profiles`;

router.get(`${BASE_URL}`, async ctx => {
  return passport.authenticate('jwt', async (err, user) => {
    if (user) {
      const profile = await getSingleProfile(user.email);
      ctx.status = 200;
      ctx.body = profile;
    } else {
      ctx.status = 401;
      ctx.body = { error: {name: 'UnauthorizedError', message: 'You should be authorized to access this resource' } };
    }
  })(ctx);
});

router.put(`${BASE_URL}`, async ctx => {
  return passport.authenticate('jwt', async (err, user) => {
    if (user) {
      const updatedProfile = await updateProfile(user.email, ctx.request.body);
      ctx.status = 200;
      ctx.body = profilesMapper.getApiObject( updatedProfile[0]);
    } else {
      ctx.status = 401;
      ctx.body = { error: {name: 'UnauthorizedError', message: 'You should be authorized to access this resource' } };
    }
  })(ctx);
});

module.exports = router;
