const dotenv = require('dotenv');
dotenv.config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const session = require('koa-session');
const passport = require('koa-passport');
const cors = require('koa-cors');

const indexRoutes = require('./routes/index');
const profilesRoutes = require('./routes/profiles');
const authRoutes = require('./routes/auth');

const app = new Koa();
const PORT = process.env.PORT || 4242;

app.use(cors());

// app.keys = ['secret-key'];
// app.use(session(app));

app.use(bodyParser());

require('./auth');
app.use(passport.initialize());
// app.use(passport.session());

app.use(indexRoutes.routes());
app.use(profilesRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
