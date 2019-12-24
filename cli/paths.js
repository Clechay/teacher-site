/**
 * @typedef {Object} buildPathsReturn
 * @property {string} project
 * @property {string} template
 * @property {string} content
 * @property {string} classes
 * @property {string} meta
 * @property {string} dist
 * @property {string} config
 * @property {string} templates
 * @property {string} defaultTemplate
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
	paths.meta = path.join(paths.content, "meta.json");
	paths.classes = path.join(paths.content, "classes");
	paths.dist = path.join(paths.project, "dist");
	paths.config = path.join(paths.project, "config.json");
	paths.templates = path.join(__dirname, "../templates");
	paths.defaultTemplate = path.join(paths.templates, "default");
	return paths;
}

module.exports = buildPaths;