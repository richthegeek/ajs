describe('Function', function () {
	test = require('./_util')(it)

	test({
		input: 'x = function () { null; }',
		test: function (result, callback) {
			result(function (err) {
				callback(err, true);
			})
		},
		test_async: true
	})

	test({
		input: 'x = function () { return 42; }',
		test: function (result, callback) {
			result(function (err, number) {
				assert.equal(number, 42)
				callback(err, true);
			})
		},
		test_async: true
	})

	test('(function (name) { return name; })("bob")')

	test({
		context: {
			name: 'bob'
		},
		input: '(function () { return name; })()',
	})

	test({
		context: {
			top: 10,
			middle: 20
		},
		input: '(function (middle) { return bottom = 2 * middle; })(15)',
		test: function (result) {
			assert.equal(this.context.middle, 20, 'Parent context was modified')
			assert.equal(this.context.bottom, undefined, 'Child context set incorrectly on parent context')
		}
	})
})