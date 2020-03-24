require("../typedefs");
const _ = require("lodash")

/**
 * 
 * @param {ClassObj} classObj 
 */
function build_primary_slug(classObj) {
	return `${classObj.group}-${classObj.no}-${classObj.date}`;
}


/**
 * 
 * @param {Content} cnt 
 * @param {ClassObj} classObj 
 * you dont need to generate primary_slug, add will overwrite it anyway
 * all the legacy slugs will be maintained until manualy removed
 */
function add(cnt, classObj) {
	if(!cnt.groups[classObj.group]) throw "group does not exist";
	let dist = _.pick(classObj,
		['date',
		'group',
		'no',
		'slug',
		'primary_slug',
		'topic',
		'agenda',
		'summary',
		'notes',
		'homework',
		'materials',
		'subjects']);
	let slug = build_primary_slug(dist);
	if(!dist.slugs.includes(slug)) dist.slugs.push(slug);
	cnt.groups[dist.group].push(dist);
}


/**
 * 
 * @param {Content} cnt 
 * @param {ClassObj} classObj 
 */
function remove(cnt, classObj) {
	let co = classObj;
	if(!cnt.groups[co.group]) throw "group does not exist";
	cnt.groups[co.group] = cnt.groups[co.group].filter(cl => cl.primary_slug !== co.primary_slug);
	cnt.classes = cnt.classes.filter(cl => cl.primary_slug !== co.primary_slug);
}

/**
 * 
 * @param {Content} cnt 
 * @param {ClassObj} classObj 
 */
function rebuild(cnt, classObj) {
	let co = classObj;
	if(!cnt.groups[co.group]) throw "group does not exist";

	// ensure class included in classlist
	if(!cnt.classes.includes(co)) cnt.classes.push(co);

	// recalculate slug
	let slug = build_primary_slug(classObj);
	classObj.primary_slug = slug;
	if(!classObj.slugs.includes(slug)) classObj.slugs.push(slug);
}


module.exports = {
	add, remove, rebuild
}