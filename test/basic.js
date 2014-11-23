
describe('Basic', function () {
	test = require('./_util')(it)
	target = {x: 5}
	test({
		input: 'this',
		output: target,
		context: {this: target}
	})

	test('null')

	test('false')

	test('"foo"')

	test({
		input: 'number',
		context: {number: 5}
	})

	test({
		input: 'person.age * 5',
		context: {person: {age: 20}}
	})

	test({
		input: 'this.age',
		context: {this: {age: 20}}
	})

	test({
		input: 'x = "foo"; y = "bar"; z = x + y',
		test: function (result) {
			assert.equal(this.context.z, "foobar")
		}
	})
})