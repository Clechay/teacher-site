const pug = require('pug');
const fs = require("fs");
const fse = require("fs-extra");
const util = require('util');
const process = require('process');
const path = require('path');

let paths = require('./paths')(process.cwd());

const storage = require('../storage');

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const mkDir = util.promisify(fs.mkdir);
const rmDir = util.promisify(fs.rmdir);
const unLink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);

/**
 * @typedef {Content & {menu:{slug:string,place:string,name:string,groupSelected:boolean}[]}} ProcessedContent
 */

/**
 * @param {Content} content 
 * @returns {ProcessedContent}
 */
function processData(content) {
	const menu = content.meta.groups.map(groupMeta => ({
		slug:'./'+groupMeta.slug+'.html',
		place:groupMeta.place,
		name:groupMeta.slug
	}))
	return {
		menu,		
		meta:content.meta,
		groups:content.groups,
		classes:content.classes,
	}
}

/**
 * @param {ProcessedContent} processedContent 
 * @param {string} groupId 
 * @returns {ProcessedContent & {groupSelected:Group}}
 */
function processDataGroup(processedContent,groupId) {
	console.log("PC:", processedContent);
	console.log("GID: ",groupId);
	processedContent.groupSelected = processedContent.groups[groupId];
	const active = processedContent.menu.find(me => me.name === groupId);
	if(active) active["active"]=true;
	return processedContent; 
}

/**
 * @typedef {Object} renderOptions
 *	@property {Content} content - Content to be rendered
 *	@property {string} toDir - path to dist directory
 *	@property {Object} renderIndex - pug renderer for index view
 *	@property {Object} renderGroup - pug renderer for group view
 */

/**
 * @param {Content} cnt 
 * @param {renderOptions} options 
 */
async function render(cnt, options) {
	const pd = processData(cnt);

	const renderers = {
		index: options.renderIndex,
		group: options.renderGroup
	}

	const indexRender = renderers.index(pd);
	const indexPath = path.join(paths.dist,'index.html');
	await writeFile(indexPath, indexRender);

	const groups = cnt.groups;
	for (const groupID in groups) {
		const group = groups[groupID];
		const locals = processDataGroup(pd,groupID);
		console.log("locals:");
		console.log(locals);
		const render = renderers.group(locals);
		const groupPath = path.join(paths.dist,group.slug+'.html');
		await writeFile(groupPath, render);
	}
}
/**
 * @typedef {Object} buildOptions
 *	@property {Content} content - Content to be rendered
 *	@property {string} template - path to directory with template
 *	@property {string} toDir - path to dist directory
 *	@property {Object} renderIndex - pug renderer for index view
 *	@property {Object} renderGroup - pug renderer for group view
 */

/**
 * 
 * @param {Content} cnt 
 * @param {buildOptions} options 
 */
async function build(cnt, options) {
	const renderOptions = {
		content: cnt,
		toDir: options.toDir,
		renderIndex: pug.compileFile(path.join(options.template,'index.pug')),
		renderGroup: pug.compileFile(path.join(options.template,'group.pug'))
	}

	fse.emptyDir(options.toDir);
	
	render(cnt,renderOptions);
}

module.exports = {
	build
}