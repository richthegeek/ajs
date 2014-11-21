test = require('./_util')

describe('Function', function () {
	it('define a function', function (done) {
		test({
			done: done,
			input: 'x = function () { null; }',
			test: function (result, callback) {
				result(function (err) {
					callback(err, true);
				})
			},
			test_async: true
		})
	})

	it('return a value', function (done) {
		test({
			done: done,
			input: 'x = function () { return 42; }',
			test: function (result, callback) {
				result(function (err, number) {
					assert.equal(number, 42)
					callback(err, true);
				})
			},
			test_async: true
		})
	})

	it('runs in place', function (done) {
		test({
			done: done,
			input: '(function (name) { return name; })("bob")'
		})
	})

	it('recieves parent context', function (done) {
		test({
			done: done,
			context: {
				name: 'bob'
			},
			input: '(function () { return name; })()'
		})
	})
})