module.exports = (node, callback) ->
	set = (property) =>
		if property.type isnt 'Identifier'
			return callback 'AssignmentExpression: property is not an Identifier?'

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

			property.context.set property.name, value, callback

	if node.left.type is 'Identifier'
		set node.left

	else if node.left.type is 'MemberExpression'
		@recurse node.left.object, node, callback, (err, object) =>
			node.left.property.context = new @constructor.Context node.left.object.context, object
			set node.left.property

	else
		callback 'AssignmentExpression: unknown left type ' + node.left.type