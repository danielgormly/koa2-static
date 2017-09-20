const send = require('koa-send');
const path = require('path');

module.exports = function (rootOpt, opts = {}) {
	opts.index = opts.index || 'index.html';

	const root = path.resolve(rootOpt);

	if (opts.debug) console.log('Static mounted on "%s"', root);

	return async (ctx) => {

		if (ctx.method !== 'GET' && ctx.method !== 'HEAD') return;
		if (typeof ctx.body !== 'undefined' || ctx.status !== 404) return;

		const file = typeof ctx.params === 'object' ? ctx.params['0'] || `/${opts.index}` : ctx.request.path;
		let requested = path.normalize(file);
		if (requested.length === 0 || requested === '/') requested = opts.index;

		await send(ctx, requested, { root });
	};
};
