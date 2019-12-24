const path = require("path")
const process = require('process');

/**
 * @typedef {Object} buildPathsReturnB
 * @property {string} project
 * @property {string} dist
 * @property {string} build
 * @property {string} template
 * @property {string} groupPug
 * @property {string} indexPug
 */

/**
 * 
 * @param {string} root
 * @returns {buildPathsReturnB}
 */
function buildPaths(root) {
	const cwd = root || process.cwd();
	const paths = {};
	paths.project = cwd;
	paths.dist = path.join(paths.project, "dist");
	paths.build = path.join(paths.project, "build");
	paths.template = path.join(paths.project, "template");
	paths.groupPug = path.join(paths.template, "index.pug");
	paths.indexPug = path.join(paths.template, "group.pug");
	return paths;
}

module.exports = buildPaths;