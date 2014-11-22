test = require('./_util')

describe('Basic', function () {
	it('this', function (done) {
		target = {x: 5}
		test({
			done: done,
			input: 'this',
			output: target,
			target: target
		})
	})

	it('null', function (done) {
		test({
			done: done,
			input: 'null'
		})
	})

	it('boolean', function (done) {
		test({
			done: done,
			input: 'false'
		})
	})

	it('array', function (done) {
		test({
			done: done,
			input: '[]',
			test: function (result) {
				return (Array.isArray(result) && result.length === 0);
			}
		})
	})

	it('string', function (done) {
		test({
			done: done,
			input: '"foo"'
		})
	})

	it('get from context', function (done) {
		test({
			done: done,
			input: 'number',
			context: {number: 5}
		})
	})

	it('get from context deep', function (done) {
		test({
			done: done,
			input: 'person.age * 5',
			context: {person: {age: 20}}
		})
	})

	it('get from this', function (done) {
		test({
			done: done,
			input: 'this.age',
			target: {age: 20}
		})
	})

	it('run multiple lines', function (done) {
		test({
			done: done,
			input: 'x = "foo"; y = "bar"; z = x + y',
			test: function (result) {
				assert.equal(this.context.z, "foobar")
			}
		})
	})
})