describe('Objects', function() {
	test = require('./_util')(it)

	test('person = {name: "Richard", "age": 25}')
		.cmp('json')
})