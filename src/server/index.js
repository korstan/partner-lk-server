const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const indexRoutes = require('./routes/index');
const profilesRoutes = require('./routes/profiles');

const app = new Koa();
const PORT = process.env.PORT || 4242;

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(profilesRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}\nLink: http://localhost:${PORT}/`);
});

module.exports = server;
