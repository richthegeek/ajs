module.exports = (node, callback) ->
	@recurse node.argument, node, callback, (err, result) ->
		callback (err or 'return'), result		
