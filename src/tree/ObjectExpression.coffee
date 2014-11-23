module.exports = (node, callback) ->

	node.context = new @constructor.Context node.context, {}
	@recurseAll node.properties, node, callback, (err) ->
		callback err, node.context.data
