describe('Objects', function() {
	test = require('./_util')(it)

	test({
		cmp: 'json',
		input: 'person = {name: "Richard", "age": 25}'
	})
})