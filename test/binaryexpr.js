test = require('./_util')

describe('Binary Expressions', function () {
	it('+', function (done) {
		test({
			done: done,
			input: 'foo + bar',
			context: {foo: 4, bar: 7}
		})
	})

	it('<', function (done) {
		test({
			done: done,
			input: 'foo < bar',
			output: true,
			context: {foo: 4, bar: 7}
		})
	})


	it('==', function (done) {
		test({
			done: done,
			input: 'foo == bar',
			output: true,
			context: {foo: 1, bar: '1'}
		})
	})

	it('===', function (done) {
		test({
			done: done,
			input: 'foo === bar',
			output: false,
			context: {foo: 1, bar: '1'}
		})
	})

	it('!=', function (done) {
		test({
			done: done,
			input: 'foo != bar',
			output: true,
			context: {foo: 4, bar: 7}
		})
	})

	it('!==', function (done) {
		test({
			done: done,
			input: 'foo !== bar',
			output: true,
			context: {foo: 4, bar: 7}
		})
	})

})