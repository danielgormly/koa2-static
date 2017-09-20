const request = require('supertest');
const test = require('tape');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('..');

test.onFinish(() => {
  process.exit();
})

test('serves index.html when no opts selected', (t) => {
  const app = new Koa();
  app.use(serve('./test/fixtures'));
  request(app.listen())
  .get('/')
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
    t.equals(res.text, 'hello world', 'Contents of index.html served');
    t.end();
  });
});

test('serves specified index in opts', (t) => {
  const app = new Koa();
  app.use(serve('./test/fixtures', { index: 'hello.html' }));
  request(app.listen())
  .get('/')
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
    t.equals(res.text, 'world', 'Contents of hello.html served');
    t.end();
  });
});

test('404 error when specifying non-existent file in opts', (t) => {
  const app = new Koa();
  app.use(serve('./test/fixtures', { index: 'nonexistentfile.html' }));
  request(app.listen())
  .get('/')
  .expect(404)
  .end((err, res) => {
    if (err) throw err;
    t.equals(res.status, 404, 'returns status 404');
    t.end();
  });
});

test('serves specified file when used as ordinary Koa middleware', (t) => {
  const app = new Koa();
  app.use(serve('./test/fixtures'));
  request(app.listen())
  .get('/hello.html')
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
    t.equals(res.text, 'world', 'Contents of hello.html served at path \'/hello.html\'');
    t.end();
  });
});

test('serves specified file when mounted on alexmingoia/koa-router', (t) => {
  const app = new Koa();
  const router = new Router();
  router.get('/path/*', serve('./test/fixtures'));
  app.use(router.routes());
  request(app.listen())
  .get('/path/hello.html')
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
    t.equals(res.text, 'world', 'Contents of hello.html served at path \'/path/hello.html\'');
    t.end();
  });
});