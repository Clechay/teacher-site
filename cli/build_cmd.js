const fse = require("fs-extra"),
		process = require('process');

const pathBuilders = require('../src/paths');
const {load, build} = require('../src');

async function build_cmd(options) {
	const projectPath = process.cwd();
	const paths = pathBuilders.buildProjectPaths(projectPath);
	const ctn = await load({fromDir:paths.root});
	await fse.emptyDir(paths.dist);
	await build(ctn, {
		content: ctn,
		template: paths.template,
		toDir: paths.dist
	})
	console.log('[OK!] all done!')
}

module.exports = build_cmd;
