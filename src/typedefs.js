/**
 * @typedef {Object} GroupMeta
 * @property {string} slug
 * @property {string} place
 */

/**
 * @typedef {Object} Meta
 * @property {GroupMeta[]} groups
 * @property {String[]} subjects
 */

/**
 * @typedef {Object} ClassObj
 *	@property {String} date
 *	@property {String} group
 *	@property {String} no
 *	@property {String} slug
 *	@property {String} topic
 *	@property {String} agenda
 *	@property {String} summary
 *	@property {String} notes
 *	@property {String} homework
 *	@property {String} materials
 * @property {String[]} subjects
 */

/**
 * @typedef {GroupMeta & {classes:ClassObj[]}} Group
 * @property {ClassObj[]} classes
 */

/**
 * @typedef {Object} Content
 * @property {Meta} meta
 * @property {Object.<string, Group>} groups
 * @property {ClassObj[]} classes
 */

// module.exports = {unused:{}};