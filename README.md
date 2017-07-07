# koa2-static

Adapted from [MatheusMK3/koa-router-static](https://github.com/MatheusMK3/koa-router-static/blob/master/index.js). Compatible with [alexmingoia/koa-router](https://github.com/alexmingoia/koa-router).

## Install

`npm i koa2-static`

## Usage

```
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-router-static');

const app = new Koa();
const router = new Router();

router.get('/assets', serve('./dist'));

app.use(router.routes());

app.listen(8000);
```