#!/usr/bin/env node
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

const pathBuilders = require('../src/paths');
const paths = {
	project: pathBuilders.buildProjectPaths(process.cwd()),
	module: pathBuilders.buildModulePaths()
}

const { load, build } = require('../src/index');

const build_cmd = require('./build_cmd');
const init_cmd = require('./init_cmd');

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