module.exports = (node, callback) ->
	node.test.parent = node
	node.body.parent = node

	cb = (err) =>
		if err is 'break'
			return callback()
		if err
			return callback err
		do_loop()
		
	do do_loop = =>
		@recurse node.test, node, callback, (err, pass) =>
			if pass
				return callback()

			@recurse node.body, node, cb, cb