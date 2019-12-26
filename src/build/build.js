require('../typedefs');

const pug = require('pug');
const fs = require("fs");
const fse = require("fs-extra");
const util = require('util');
const process = require('process');
const path = require('path');

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
 * @typedef {Object} dataProcessing
 * @property {(cnt:Content)=>Content} general
 * @property {(cnt:Content)=>Content} group
 */

/**
 * @typedef {Object} renderOptions
 *	@property {Content} content - Content to be rendered
 *	@property {string} toDir - path to dist directory
 *	@property {Object} renderIndex - pug renderer for index view
 *	@property {Object} renderGroup - pug renderer for group view
 *	@property {dataProcessing} dataProcessing - pug renderer for group view
 */

/**
 * @param {Content} cnt 
 * @param {renderOptions} options 
 */
async function render(cnt, options) {
	const pd = options.dataProcessing.general( processData(cnt) );

	const renderers = {
		index: options.renderIndex,
		group: options.renderGroup
	}

	const indexRender = renderers.index(pd);
	const indexPath = path.join(options.toDir,'index.html');
	await writeFile(indexPath, indexRender);

	const groups = cnt.groups;
	for (const groupID in groups) {
		const group = groups[groupID];
		const locals = options.dataProcessing.group( processDataGroup(pd,groupID) );
		console.log("locals:");
		console.log(locals);
		const render = renderers.group(locals);
		const groupPath = path.join(options.toDir,group.slug+'.html');
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
		renderGroup: pug.compileFile(path.join(options.template,'group.pug')),
		dataProcessing: require(path.join(options.template,'dataProcessing.js'))
	}

	fse.emptyDir(options.toDir);
	
	render(cnt,renderOptions);
}

module.exports = {
	build
}