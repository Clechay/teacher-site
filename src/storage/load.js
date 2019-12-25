require("../typedefs");

const fs = require("fs");
const util = require('util');
const path = require('path');
const buildPaths = require('../paths').buildProjectPaths;

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

async function getMetadata(metaPath){
	const metaJson = await readFile(metaPath, "utf8");
	return JSON.parse(metaJson);
}

async function getClasses(classesDirPath){
	const classes = [];
	const classesPaths = await readDir(classesDirPath);
	for (const classFilename of classesPaths) {
		const classPath = path.join(classesDirPath,classFilename);
		const classString = await readFile( classPath, "utf8");
		const classObj = JSON.parse(classString);
		classes.push(classObj);
	}
	return classes;
}
async function getGroups(content){
	const groups = {};
	for (const key in content.meta.groups) {
		const group = content.meta.groups[key];
		groups[group.slug] = group;
		groups[group.slug].classes = [];
	}
	for (const classObj of content.classes) {
		groups[classObj.group].classes.push(classObj);
	}
	for (const id in groups) {
		const group = groups[id];
		group.classes.sort((a,b)=>{
			// newest to oldest
			return (new Date(a)) < (new Date(b)) ? 1 : -1;
		})
	}
	return groups;
}


/**
 * @typedef {Object} loadOptions
 * @property {string} fromDir - root directory of a project
 */

/**
 * @param {loadOptions} options - options for load function
 * @returns {Content}
 */
const load = async (options)=>{
	if(!options || !options.fromDir) return false;
	const paths = buildPaths(options.fromDir);
	const content = {
		meta: await getMetadata(paths.meta),
		groups: {},
		classes: await getClasses(paths.classes)
	}
	content.groups = await getGroups(content);
	return content;
}

module.exports = {
	load
}