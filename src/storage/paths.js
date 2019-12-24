const path = require("path")
/**
 * @param {string} path - Path to project directory
 */
const buildPaths = (pathToProject)=>{
	const paths = {};
	paths.project = pathToProject
	paths.content = path.join(paths.project, "content")
	paths.meta = path.join(paths.content, "meta.json")
	paths.classes = path.join(paths.content, "classes")
	console.log(paths)
	return paths;
}
module.exports = buildPaths;