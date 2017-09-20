# koa2-static-middleware

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[!lmao][https://img.shields.io/badge/pls%20download-lmao-ff69b4.svg]


A very simple wrapper for [koa-send](https://github.com/koajs/send). Sends files from specified directory. Adapted from [MatheusMK3/koa-router-static](https://github.com/MatheusMK3/koa-router-static/blob/master/index.js). Compatible with [alexmingoia/koa-router](https://github.com/alexmingoia/koa-router). Serves static files at directory.

## Install

`npm i koa2-static-middleware`

## API

**serve(path, opts)**

#### `path`: _String_ local directory from where to serve assets
#### `opts`: _Object_ {
&nbsp;&nbsp;`opts.index`: _string_ file to serve from root path. _default_: `index.html`

&nbsp;&nbsp;`opts.debug`: _boolean_ file to serve from root path (e.g. `/`). _default_: `false`
#### }



## Example usage (with alexmingoia/koa-router)

```javascript
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa2-static-middleware');

const app = new Koa();
const router = new Router();

router.get('/assets/*', serve('./dist', { index: 'index.htm' }));

app.use(router.routes());

app.listen(8000, () => console.log('Serving local files from ./dist directory at http://localhost:8000/assets/'));
```

## Example usage (without alexmingoia/koa-router)

```javascript
const Koa = require('koa');
const serve = require('koa2-static-middleware');

const app = new Koa();

app.use(serve('./dist');

app.listen(8000, () => console.log('Serving local files from ./dist directory at http://localhost:8000/'));
```

## Quirks

This module determines whether `alexmingoia/koa-router` is being used through duck-typing, specifically it checks whether `ctx.params` is set or not. If it is, it will use koa-router routes. So if you are using other middleware that hijacks the `params` property on `ctx`, you may run into problems.

[npm-version]: https://img.shields.io/npm/v/koa2-static-middleware.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/koa2-static-middleware
[travis-url]: https://travis-ci.org/danielgormly/koa2-static-middleware
[travis-image]: https://travis-ci.org/danielgormly/koa2-static-middleware.svg?branch=master
[david-image]: https://david-dm.org/danielgormly/koa2-static-middleware.svg
[david-url]: https://david-dm.org/danielgormly/koa2-static-middleware
[downloads-image]: https://img.shields.io/badge/pls%20download-lmao-ff69b4.svg
[downloads-url]: https://img.shields.io/npm/dw/koa2-static-middleware.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
