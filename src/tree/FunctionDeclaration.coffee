module.exports = (node, callback) ->
	self = @
	@recurseAll node.params, node, callback, (err, params) ->
		fn = (param_values..., callback) ->
			ctx = {}
			params.forEach (key, i) ->
				ctx[key] = param_values[i]
			vm = new Evaluator @target, ctx, {inferCallbacks: self.options.inferCallbacks, allowReturnOutsideFunction: true}
			
			try
				vm.recurse node.body, callback
			catch e
				if e instanceof Evaluator.Return
					return callback null, e.value
				
				throw e

		pstring = params.concat('callback').join(', ')
		ret_fn = eval("ret_fn = function (#{pstring}) { return fn(#{pstring}) }")
		callback null, ret_fn