test = require('./_util')

describe('Unary', function () {
	it('-', function (done) {
		test({
			done: done,
			input: '-3'
		})
	})

	it('+', function (done) {
		test({
			done: done,
			input: '+3'
		})
	})

	it('!', function (done) {
		test({
			done: done,
			input: '!true'
		})
	})

	it('void', function (done) {
		test({
			done: done,
			input: 'void(x = 4)',
			test: function (result) {
				assert.equal(result, undefined)
				assert.equal(this.context.x, 4)
			}
		})
	})

	it('typeof', function (done) {
		test({
			done: done,
			input: 'typeof 13'
		})
	})
})