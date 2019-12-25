const process = require('process');
const cli = require('quick-cli');

const pathBuilders = require('../src/paths');
const {load, save} = require('../src');
const paths = pathBuilders.buildProjectPaths(process.cwd());

/**
 * @param {Content} cnt 
 */
async function addSubject(cnt) {
	const newSubject = await cli.input.text('subject name?', 'invalid');
	cnt.meta.subjects.push(newSubject);
}
/**
 * @param {Content} cnt 
 */
async function addGroup(cnt) {
	const newGroup = {
		slug: await cli.input.text('group slug?', 'invalid'),
		place: await cli.input.text('place?', 'invalid')
	}
	cnt.groups[newGroup.slug] = newGroup;
}
/**
 * @param {Content} cnt 
 */
async function addClass(cnt) {
	const newClass = {
		date: await cli.input.text(`date`),
		group: await cli.input.text(`group`),
		no: await cli.input.text(`no`),
		slug: await cli.input.text(`slug`),
		topic: await cli.input.text(`topic`),
		subjects: await cli.input.checkbox('subjects',cnt.meta.subjects),
		agenda: await cli.input.text(`agenda`),
		summary: await cli.input.text(`summary`),
		notes: await cli.input.text(`notes`),
		homework: await cli.input.text(`homework`),
		materials: await cli.input.text(`materials`),
	}
	cnt.classes.push(newClass);
}

async function edit_cmd(action, subject, options) {
	const cnt = await load({fromDir:paths.root});
	if(action==="add" && subject==="subject") await addSubject(cnt);
	if(action==="add" && subject==="group") await addGroup(cnt);
	if(action==="add" && subject==="class") await addClass(cnt);
	
	await save(cnt,paths.root);
	console.log('[OK!] all done!')
}

module.exports = edit_cmd;