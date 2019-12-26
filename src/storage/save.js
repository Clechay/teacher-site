const fs = require("fs");
const util = require('util');
const path = require('path');
const buildPaths = require('../paths').buildProjectPaths;
let paths = {};

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const mkDir = util.promisify(fs.mkdir);
const rmDir = util.promisify(fs.rmdir);
const unLink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);

async function clear(){
	const classesPaths = await readDir(paths.classes);
	for (const classFilename of classesPaths) {
		await unLink( path.join(paths.classes, classFilename) );
	}
	await rmDir(paths.classes);
	await unLink(paths.meta);
	await mkDir(paths.classes);
}

function pick(...keys){
	return sourceObj => {
		const resultObj = {};
		keys.forEach(key => resultObj[key]=sourceObj[key]);
		return resultObj;
	}
}

function buildMeta(content){
	const groups = [];
	for (const key in content.groups) {
		groups.push(content.groups[key]);
	}
	const meta = {
		subjects:content.meta.subjects,
		groups:groups.map(pick("slug","place"))
	}
	return JSON.stringify(meta);
}

function buildClasses(content){
	const allClasses = content.classes;
	const result = allClasses.map( classObj => ({
		path:path.join(paths.classes, `${classObj.date}-${classObj.group}.json`),
		data:JSON.stringify(classObj)
	}) )
	return result;
}


async function save(cnt,projectPath){
	paths = buildPaths(projectPath);
	await clear();
	await writeFile(paths.meta, buildMeta(cnt))
	const classes = buildClasses(cnt);
	for (const classObj of classes) {
		await writeFile(classObj.path, classObj.data);
	}
}

module.exports = {
	save
}