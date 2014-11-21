module.exports = (node, callback) ->
	
	@get [node.name], node.context, callback, (err, [res]) ->
		callback null, res
