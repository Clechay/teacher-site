/**
 * @typedef {Object} buildPathsReturn
 * @property {string} project
 * @property {string} template
 * @property {string} content
 * @property {string} dist
 * @property {string} config
 */

const path = require("path");
const process = require('process');
/**
 * 
 * @param {string} root
 * @returns {buildPathsReturn}
 */
function buildPaths(root) {
	root = root || process.cwd();
	const paths = {};
	paths.project = root;
	paths.template = path.join(paths.project, "template");
	paths.content = path.join(paths.project, "content");
	paths.dist = path.join(paths.project, "dist");
	paths.config = path.join(paths.project, "config.json");
	return paths;
}

module.exports = buildPaths;