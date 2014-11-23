module.exports = (node, callback) ->
	@recurse node.object, node, callback, (err, object) =>
		node.property.context = new @constructor.Context node.context, object
		@recurse node.property, node, callback, (err, value) =>
			callback null, value

