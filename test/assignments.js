test = require('./_util')

describe('Assignments', function () {
	it('assign to context', function (done) {
		test({
			done: done,
			input: 'x = 45;',
			test: function (result) {
				assert.equal(this.context.x, 45)
			}
		})
	})

	it('assign to object', function (done) {
		test({
			done: done,
			input: 'person.age = 25',
			context: {person: {}},
			test: function (result) {
				assert.equal(this.context.person.age, 25)
			}
		})
	})

	it('assign with +=', function (done) {
		test({
			done: done,
			input: 'x += 10',
			context: {x: 5},
			test: function (result) {
				assert.equal(this.context.x, 15)
			}
		})
	})
})