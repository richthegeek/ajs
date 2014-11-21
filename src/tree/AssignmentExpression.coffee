module.exports = (node, callback) ->
	if node.left.type is 'Identifier'
		@recurseAll [node.left, node.right], node, callback, (err, [property, value]) =>
			callback null, @context[property] = value

	else
		@recurseAll [node.left.object, node.left.property, node.right], node, callback, (err, [object, property, value]) ->
			object[property] = value
			callback null, value