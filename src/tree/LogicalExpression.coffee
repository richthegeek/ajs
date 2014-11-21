module.exports = (node, callback) ->
	if node.operator not in ['&&', '||']
		callback 'Undefined LogicalExpression operator: ' + node.operator

	# todo: resolve in order, as per js rules
	node.left.parent = node
	node.right.parent = node
	@recurse node.left, node, callback, (err, left) =>
		if err then return callback err

		if not left and node.operator is '&&'
			return callback null, false

		if left and node.operator is '||'
			return callback null, left

		@recurse node.right, node, callback, (err, right) =>
			if err then return callback err

			return callback null, right || left