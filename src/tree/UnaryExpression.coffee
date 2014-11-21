module.exports = (node, callback) ->

	node.argument.parent = node
	@recurse node.argument, node, callback, (err, argument) ->
		switch node.operator
			when '-'
				callback null, -argument

			when '+'
				callback null, +argument

			when 'typeof'
				callback null, typeof argument

			else
				callback 'Undefined UnaryExpression operator: ' + node.operator
