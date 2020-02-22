const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../index');

chai.use(chaiHttp);

const newUser = {
  email: 'a@a.com',
  password: '123123sr',
  firstname: 'Иван',
  lastname: 'Иванов',
  patronymic: 'Иванович',
  phone: '+79617744574',
  inn: '0123456789',
  organization: 'ООО Ромашка',
  position: 'Старший сотрудник',
};

let token;
function testError(responseError, expectedName, expectedMessage) {
  should.exist(responseError);
  should.exist(responseError.name);
  should.exist(responseError.message);
  should.equal(responseError.name, expectedName);
  should.equal(responseError.message, expectedMessage);
}

describe('API routes', function() {
  describe('POST auth/register', function() {
    it('should register new user (getting jwt in res)', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send(newUser)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res.body.token);
          token = res.body.token;
          done();
        });
    });
    it('should not register user w/ same email (and inn)', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send(newUser)
        .end((err, res) => {
          should.not.exist(err);
          should.equal(res.status, 400);
          should.not.exist(res.body.token);
          testError(res.body.error, 'EmailError', 'Email is already in use');
          done();
        });
    });
    it('should not register user w/ same inn', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send({ ...newUser, email: 'b@b.com' })
        .end((err, res) => {
          should.not.exist(err);
          should.equal(res.status, 400);
          should.not.exist(res.body.token);
          testError(res.body.error, 'InnError', 'INN is already in use');
          done();
        });
    });
  });

  describe('POST auth/login', function() {
    it('should authenticate registered user', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send({ email: newUser.email, password: newUser.password })
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res.body.token);
          res.body.token.should.be.a('string');
          token = res.body.token;
          done();
        });
    });
    it('should not authenticate unregistered user', (done) => {
      chai
        .request(server)
        .post('/auth/login')
        .send({ email: 'unregistered@user.com', password: '2222391222' })
        .end((err, res) => {
          should.not.exist(err);
          should.equal(res.status, 400);
          should.not.exist(res.body.token);
          testError(res.body.error, 'CredentialsError', 'Wrong email or password');
          done();
        });
    });
  });
});
