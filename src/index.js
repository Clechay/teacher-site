const storage = require("./storage");
const build = require("./build/build").build;

module.exports = {
	build,
	load: storage.load,
	save: storage.save
}