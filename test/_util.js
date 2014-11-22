ast = require('../')
assert = require('assert')

module.exports = function (it) {
	return function (obj) {
		if (typeof obj == 'string') {
			obj = {input: obj}
		}
		it(obj.input, function (done) {
			var debug, ast_obj;
			debug = (obj.debug === true ? console.info.bind(console) : function() {})

			obj.done = done
			obj.target = obj.target || {}
			obj.context = obj.context || {}
			obj.options = obj.options || {}

			if (typeof obj.output === 'undefined' && typeof obj.test === 'undefined') {
				obj.context.this = obj.context.this || obj.target;
				(function () {
					with (obj.context) {
						obj.output = eval(obj.input)
					}
				}).call(obj.context.this)
			}

			ast_obj = new ast(obj.target, obj.context, obj.options)
			ast_obj.eval(obj.input, function(err, result) {
				obj.err = err
				obj.result = result
				debug(obj)
				
				if (!err) {
					if (obj.test) {
						if (obj.test_async) {
							return obj.test.call(obj, result, function (err, ok) {
								assert(ok, 'test(result) returned false')
								obj.done(err)
							})
						}
						assert(obj.test.call(obj, result) !== false, 'test(result) returned false')
						if (typeof obj.output !== 'undefined') {
							assert.equal(result, obj.output);
						}
					} else {
						if (obj.cmp == 'string') {
							assert.equal(Object.prototype.toString.call(result), Object.prototype.toString.call(obj.output))
						} else if (obj.cmp == 'json') {
							assert.equal(JSON.stringify(result), JSON.stringify(obj.output))
						} else {
							assert.equal(result, obj.output);
						}
					}
				}
				obj.done(err)
			})
		})
	}
}