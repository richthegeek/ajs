describe('Arrays', function () {
	test = require('./_util')(it)
	test({
		input: '[]',
		cmp: 'json'
	})

	test({
		input: '[42, "foo", true]',
		cmp: 'json'
	})

	test({
		context: {name: 'Richard', age: 25},
		input: '[name, age]',
		cmp: 'json'
	})

})