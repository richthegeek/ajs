
describe('Basic', function () {
	test = require('./_util')(it)
	target = {x: 5}

	test('this')
		.output(target)
		.context({this: target})

	test('null')

	test('false')

	test('"foo"')

	test('reg = /.*/')
		.cmp('string')

	test('number')
		.context({number: 5})

	test('person.age * 5')
		.context({person: {age: 20}})

	test('this.age')
		.context({this: {age: 20}})

	test('x = "foo"; y = "bar"; z = x + y')
		.test(function (result) {
			assert.equal(this.context.z, "foobar")
		})
})