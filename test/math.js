test = require('./_util')

describe('Math', function () {
	it('addition', function (done) {
		test({
			done: done,
			input: '3 + 5'
		})
	})

	it('subtraction', function (done) {
		test({
			done: done,
			input: '3 - 5'
		})
	})

	it('multiplication', function (done) {
		test({
			done: done,
			input: '3 * 5'
		})
	})

	it('division', function (done) {
		test({
			done: done,
			input: '3 / 5'
		})
	})

	it('complex', function (done) {
		test({
			done: done,
			input: '5 * 4 / 3 + 2 - 1'
		})
	})

	it('negative numbers', function (done) {
		test({
			done: done,
			input: '-3 - -3'
		})
	})

})