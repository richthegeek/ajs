module.exports = (node, callback) ->
	@recurseAll [node.callee].filter(Boolean), node, callback, (err, [object]) =>
		# node.callee.object = {type: 'Literal', value: object}
		node.callee = {type: 'Literal', value: object}
		@recurseAll [node.callee].concat(node.arguments), node, callback, (err, [callee, args...]) =>
			node.callee = callee
			node.arguments = args

			# check if the last arg is named "callback", do some special handling
			string = callee.toString()
			if @options.inferCallbacks and callee_args = string.match(/^function \(([^\)]+)\)/)
				callee_args = callee_args[1].split(/,\s*/)
					
				cal = callee_args.length
				al = args.length

				if callee_args[cal - 1] is 'callback'
					if (al + 1) is cal
						args.push callback
						return callee args...
					else if al is cal and typeof args[al - 1] isnt 'function'
						return callback 'Fn expected callback function as last argument, had', args[al - 1]

			if string.indexOf('[native code]') >= 0
				if callee.name is 'toString'
					console.log object, callee.name
					callback null, object[callee.name] args...
				else
					callback null, callee args...
			else
				callback null, callee args...