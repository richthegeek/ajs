module.exports = (node, callback) ->
	@recurse node.expression, node, callback, callback