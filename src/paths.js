const path = require("path");
const process = require('process');

/**
 * @typedef {Object} buildProjectPathsReturn
 * @property {string} root
 * @property {string} template
 * @property {string} content
 * @property {string} meta
 * @property {string} classes
 * @property {string} dist
 * @property {string} config
 */

/**
 * @param {string} rootPath 
 * @returns {buildProjectPathsReturn}
 */

const buildProjectPaths = (rootPath) => {
	const paths = {};
	paths.root = rootPath;
	paths.template = path.join(paths.root, "template");
	paths.content = path.join(paths.root, "content");
	paths.meta = path.join(paths.content, "meta.json");
	paths.classes = path.join(paths.content, "classes");
	paths.dist = path.join(paths.root, "dist");
	paths.config = path.join(paths.root, "config.json");
	return paths;
};



/**
 * @typedef {Object} buildModulePathsReturn
 *	@property {string} root
 *	@property {string} cli
 *	@property {string} src
 *	@property {string} templates
 *	@property {string} defaultTemplate
 *	@property {string} build
 *	@property {string} storage
 */

/**
 * @param {string} rootPath 
 * @returns {buildModulePathsReturn}
 */
const buildModulePaths = () => {
	const paths = {};
	paths.root = path.join(__dirname, '../');
	paths.cli = path.join(paths.root, 'cli');
	paths.src = path.join(paths.root, 'src');
	paths.templates = path.join(paths.root, 'templates');
	paths.defaultTemplate = path.join(paths.templates, 'default');
	paths.build = path.join(paths.src, 'build');
	paths.storage = path.join(paths.src, 'storage');
	return paths;
};


module.exports = {
	buildProjectPaths,
	buildModulePaths
};