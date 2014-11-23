module.exports = (node, callback) ->

	@recurse node.value, node, callback, (err, value) ->
		if node.key.type is 'Literal'
			key = node.key.value
		else if node.key.type is 'Identifier'
			key = node.key.name
		else
			return callback 'Property: invalid key type ' + node.key.type
			
		node.context.set key, value, callback