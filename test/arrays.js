describe('Arrays', function () {
	test = require('./_util')(it)

	test('[]')
		.cmp('json')

	test('[42, "foo", true]')
		.cmp('json')

	test('[name, age * 5]')
		.cmp('json')
		.context({name: 'Richard', age: 25})

})