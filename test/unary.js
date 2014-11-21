test = require('./_util')

describe('Unary', function () {
	it('negative', function (done) {
		test({
			done: done,
			input: '-3'
		})
	})

	it('typeof', function (done) {
		test({
			done: done,
			input: 'typeof 13'
		})
	})
})