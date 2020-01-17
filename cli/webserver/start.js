const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const send = require('koa-send');
const { load, build, save } = require('../../src');
const app = new Koa();
const router = new Router();
let cnt = {};

const start = async (projectPath, port) => {
	cnt = await load({fromDir:projectPath});
	console.log(projectPath);
	console.log('cnt:',cnt);

	router.post('/save', (ctx, next) => {
		return ctx.response.body = JSON.stringify(cnt);
	});

	app
		.use(router.routes())
		.use(router.allowedMethods());

	app.use(async (ctx) => {
		await send(ctx, ctx.path, { 
			root: __dirname + '/static',
			index:'index.html'
		});
	})

	const appPort = port || 3000;
	app.listen(appPort);
	console.log(`editor is avaiable at http://localhost:${appPort}`);
}



module.exports = {
	start
}