require("../typedefs");

let Class = require('./class')

let cnt = null;

/**
 * 
 * @param {Content} content 
 */
function use(content) {
	cnt = content;
}

/**
 * @param {ClassObj} classObj 
 * you dont need to generate primary_slug, add will overwrite it anyway
 * all the legacy slugs will be maintained until manualy removed
 */
function addClass(classObj) {
	return Class.add(cnt,classObj)
}


/**
 * @param {ClassObj} classObj 
 */
function removeClass(classObj) {
	return Class.remove(cnt,classObj)
}

/**
 * @param {ClassObj} classObj 
 */
function rebuildClass(classObj) {
	return Class.rebuild(cnt,classObj)
}


module.exports = {
	use,
	addClass, removeClass, rebuildClass,
}