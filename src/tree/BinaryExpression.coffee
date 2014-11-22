module.exports = (node, callback) ->
	@recurseAll [node.left, node.right], node, callback, (err, [left, right]) =>
		switch node.operator
			when '+'
				callback null, left + right
			when '-'
				callback null, left - right
			when '*'
				callback null, left * right
			when '/'
				callback null, left / right

			when '=='
				callback null, `left == right`

			when '==='
				callback null, `left === right`
			
			when '!='
				callback null, `left != right`

			when '!=='
				callback null, `left !== right`

			when '<'
				callback null, left < right

			when '<='
				callback null, left <= right

			when '>'
				callback null, left > right

			when '>='
				callback null, left >= right

			when '<'
				callback null, left < right



			else
				callback 'Undefined BinaryExpression operator: ' + node.operator