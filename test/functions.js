describe('Function', function () {
	test = require('./_util')(it)

	test('x = function () {}')
		.test_async()
		.test(function (result, callback) {
			result(function (err) {
				callback(err, true);
			})
		})

	test('x = function () { return 42; }')
		.test_async()
		.test(function (result, callback) {
			result(function (err, number) {
				assert.equal(number, 42)
				callback(err, true);
			})
		})

	test('(function (name) { return name; })("bob")')

	test('(function () { return name; })()')
		.context({name: 'bob'})

	test('(function (middle) { return bottom = 2 * middle; })(15)')
		.context({
			top: 10,
			middle: 20
		})
		.test(function (result) {
			assert.equal(this.context.middle, 20, 'Parent context was modified')
			assert.equal(this.context.bottom, undefined, 'Child context set incorrectly on parent context')
		})
})