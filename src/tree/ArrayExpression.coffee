module.exports = (node, callback) ->

	@recurseAll node.elements, node, callback, callback