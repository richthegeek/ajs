module.exports = (node, callback) ->
	Evaluator = @constructor
	self = @
	params = node.params.map (param) -> param.name

	fn = (param_values..., callback) ->
		args = {}
		params.forEach (key, i) ->
			args[key] = param_values[i]
		args.arguments = arguments
		node.context = new Evaluator.Context node.context, args

		vm = new Evaluator node.context, {inferCallbacks: self.options.inferCallbacks, allowReturnOutsideFunction: true}
		
		cb = (err, [results...]) ->
			result = results.pop()
			if err isnt 'return'
				return callback err
			return callback null, result


		vm.recurse node.body, node, cb, cb

	pstring = params.concat('callback').join(', ')
	ret_fn = eval("ret_fn = function (#{pstring}) { return fn(#{pstring}) }")
	ret_fn.toString = -> return "function (#{pstring}) { [Evaluated Function] }"
	callback null, ret_fn