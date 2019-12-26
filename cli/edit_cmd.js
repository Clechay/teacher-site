const process = require('process');
const cli = require('quick-cli');
const {ok, multilaneInput} = require('./cli');

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
		agenda: await multilaneInput(`agenda`),
		summary: await multilaneInput(`summary`),
		notes: await multilaneInput(`notes`),
		homework: await multilaneInput(`homework`),
		materials: await multilaneInput(`materials`),
	}
	cnt.classes.push(newClass);
}
/**
 * @param {Content} cnt 
 */
async function removeClass(cnt, options) {
	if(options.group) cli.out.info(`showing only classes assigned to ${options.group} group`)
	else cli.out.info(`to decrease number of classes visible use --group option`)
	let choices = cnt.classes;
	if(options.group) choices = choices.filter( cl => cl.group === options.group );
	choices = choices.map(cl => cl.slug);
	const slug = await cli.input.list('select class to be removed',choices);
	cnt.classes = cnt.classes.filter( cl => cl.slug!==slug);
	ok('class removed')
}

async function edit_cmd(action, subject, options) {
	const cnt = await load({fromDir:paths.root});
	console.log(action, subject, options);
	if(action==="add" && subject==="subject") await addSubject(cnt);
	if(action==="add" && subject==="group") await addGroup(cnt);
	if(action==="add" && subject==="class") await addClass(cnt);
	
	if(action==="remove" && subject==="class") await removeClass(cnt,options);
	
	await save(cnt,paths.root);
	ok('all done!')
}

module.exports = edit_cmd;