module.exports = (node, callback) ->

	@recurseAll [node.callee].concat(node.arguments), node, callback, (err, [callee, args...]) ->
		obj = new callee args...
		for key, fn of obj when typeof fn is 'function'
			obj[key] = fn.bind(obj)

		return callback null, obj
