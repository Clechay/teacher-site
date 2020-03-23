const program = require('commander'),
	fs = require("fs-extra"),
	process = require('process');

const {fail,ok, attempt} = require('./cli');

const pathBuilders = require('../src/paths');
const projectPaths = pathBuilders.buildProjectPaths(process.cwd());
const modulePaths = pathBuilders.buildModulePaths();



async function init_cmd(options) {
	const cwdLs = await fs.readdir(projectPaths.root);
	if (cwdLs && cwdLs.length) {
		fail(`project directory (${projectPaths.root}) is not empty, init aborted`);
		return;
	}
	
	await attempt(async ()=>fse.emptyDir(projectPaths.root), 
						`project directory has been prepared`,
						`unable to prepare (create or empty) dir ${projectPaths.root}`);

	await attempt(async ()=>fs.mkdir(projectPaths.template),`mkdir ${projectPaths.template}`);
	await attempt(async ()=>fs.mkdir(projectPaths.content), `mkdir ${projectPaths.content}`);
	await attempt(async ()=>fs.mkdir(projectPaths.classes), `mkdir ${projectPaths.classes}`);
	await attempt(async ()=>fs.mkdir(projectPaths.dist),	  `mkdir ${projectPaths.dist}`);

	await attempt(async ()=>fs.writeFile(projectPaths.config, `{}`), `write config.json`);

	const meta = {subjects: [],groups: []};

	await attempt(	async ()=>fs.writeFile(projectPaths.meta, JSON.stringify(meta)), 
						`write meta.json`);

	await attempt( async ()=>fse.copy(modulePaths.defaultTemplate, projectPaths.template),
						`copy default template from module`);
	ok('empty project is ready!')
}

module.exports = init_cmd;