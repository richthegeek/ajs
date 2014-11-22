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
				assert.equal(result, undefined, 'Void did not return "undefined"')
				assert.equal(this.context.x, 4, 'Did not execute expression properly')
			}
		})
	})

	it('typeof', function (done) {
		test({
			done: done,
			input: 'typeof 13'
		})
	})

	it('delete', function (done) {
		test({
			done: done,
			context: {foo: '42'},
			input: 'delete foo',
			output: true,
			test: function (result) {
				assert.equal(this.context.foo, undefined, 'Failed to delete "foo" from context')
			}
		})
	})
})