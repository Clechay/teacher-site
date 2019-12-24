require('../src/typedefs');

const program = require('commander'),
	fs = require("fs"),
	fse = require("fs-extra"),
	util = require('util'),
	path = require('path'),
	process = require('process');

const readDir = util.promisify(fs.readdir),
	readFile = util.promisify(fs.readFile),
	mkDir = util.promisify(fs.mkdir),
	rmDir = util.promisify(fs.rmdir),
	unLink = util.promisify(fs.unlink),
	writeFile = util.promisify(fs.writeFile);

const paths = require("./paths")(process.cwd());
const { load, build } = require('../src/index');

async function init_cmd(options) {
	const cwdLs = readDir(paths.project);
	if (cwdLs && cwdLs.length) {
		console.error("CWD not empty, init aborted");
		return;
	}
	fse.emptyDirSync(paths.project);
	await mkDir(paths.template);
	await mkDir(paths.content);
	await mkDir(paths.dist);
	await writeFile(paths.config, `{}`);
	console.log('[OK!] empty project is ready!')
}

async function build_cmd(options) {
	const ctn = await load({fromDir:paths.project});
	console.log(paths);
	console.log(paths.dist);
	// emptyDirSync(paths.dist);
	await build(ctn, {
		content: ctn,
		template: paths.template,
		toDir: paths.dist
	})
	console.log('[OK!] all done!')
}

program
	.command('init')
	.description('inits project')
	.action(async () => {
		init_cmd({});
	});

program
	.command('build')
	.description('builds project')
	.action(async () => {
		build_cmd({});
	});


program.parse(process.argv);