const program = require('commander'),
	fs = require("fs"),
	fse = require("fs-extra"),
	util = require('util'),
	path = require('path'),
	process = require('process'),
	cli = require("quick-cli");

const ok = (...str) => cli.out("success", "[OK!] ", ...(str.map( el => String(el))));
const fail = (...str) => cli.out("error", "[FAILED] ", ...(str.map( el => String(el))));

const readDir = util.promisify(fs.readdir),
	readFile = util.promisify(fs.readFile),
	mkDir = util.promisify(fs.mkdir),
	rmDir = util.promisify(fs.rmdir),
	unLink = util.promisify(fs.unlink),
	writeFile = util.promisify(fs.writeFile);

const pathBuilders = require('../src/paths');
const projectPaths = pathBuilders.buildProjectPaths(process.cwd());
const modulePaths = pathBuilders.buildModulePaths();

async function attempt(func, primaryMsg, badMsg) {
	const goodMsg = primaryMsg;
	try {
		await func();
		ok(goodMsg);
	} catch (error) {
		fail(badMsg);
		throw new Error(error);
	}
}

async function init_cmd(options) {
	const cwdLs = await readDir(projectPaths.root);
	if (cwdLs && cwdLs.length) {
		fail(`project directory (${projectPaths.root}) is not empty, init aborted`);
		return;
	}
	await attempt(async ()=>fse.emptyDir(projectPaths.root), 
						`project directory has been prepared`,
						`unable to prepare (create or empty) dir ${projectPaths.root}`);
						
	await attempt(async ()=>mkDir(projectPaths.template),`mkdir ${projectPaths.template}`);
	await attempt(async ()=>mkDir(projectPaths.content),`mkdir ${projectPaths.content}`);
	await attempt(async ()=>mkDir(projectPaths.classes),`mkdir ${projectPaths.classes}`);
	await attempt(async ()=>mkDir(projectPaths.dist),	`mkdir ${projectPaths.dist}`);

	await attempt(async ()=>writeFile(projectPaths.config, `{}`), `write config.json`);

	const meta = {subjects: [],groups: []};

	await attempt(	async ()=>writeFile(projectPaths.meta, JSON.stringify(meta)), 
						`write meta.json`);

	await attempt( async ()=>fse.copy(modulePaths.defaultTemplate, projectPaths.template),
						`copy default template from module`);
	ok('empty project is ready!')
}

module.exports = init_cmd;