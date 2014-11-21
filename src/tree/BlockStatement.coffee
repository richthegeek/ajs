module.exports = (node, callback) ->
	@recurseAll node.body, node, callback, callback
