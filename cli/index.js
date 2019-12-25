#!/usr/bin/env node
require('../src/typedefs');

const program = require('commander'),
	process = require('process');

const build_cmd = require('./build_cmd');
const init_cmd = require('./init_cmd');
const edit_cmd = require('./edit_cmd');

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

program
	.command('add <subject>')
	.description('builds project')
	.action(async (subject) => {
		edit_cmd('add',subject);
	});


program.parse(process.argv);