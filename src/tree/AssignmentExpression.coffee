module.exports = (node, callback) ->
	set = (target, property) =>
		if property.type isnt 'Identifier'
			return callback 'AssignmentExpression: property is not an Identifier?'

		# property = property.name

		@recurseAll [property, node.right], node, callback, (err, [old_value, new_value]) =>
			switch node.operator
				when '='
					value = new_value
				when '+='
					value = old_value + new_value
				when '-='
					value = old_value - new_value
				when '*='
					value = old_value * new_value
				when '/='
					value = old_value / new_value
				when '%='
					value = old_value % new_value
				when '<<='
					value = old_value << new_value
				when '>>='
					value = old_value >> new_value
				when '>>>='
					value = old_value >>> new_value
				when '&='
					value = old_value & new_value
				when '^='
					value = old_value ^ new_value
				when '|='
					value = old_value | new_value

				else
					return callback 'AssignmentExpression: unknown operator ' + node.operator

			@set property.name, target, value, callback

	if node.left.type is 'Identifier'
		set @context, node.left

	else if node.left.type is 'MemberExpression'
		@recurse node.left.object, node, callback, (err, object) ->
			set object, node.left.property

	else
		callback 'AssignmentExpression: unknown left type ' + node.left.type