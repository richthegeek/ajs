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
		input: '(function () { return name; })()'
	})
})