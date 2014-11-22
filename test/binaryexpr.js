
describe('Binary Expressions', function () {
	test = require('./_util')(it)
	test({
		input: 'foo + bar',
		context: {foo: 4, bar: 7}
	})

	test({
		input: 'foo < bar',
		output: true,
		context: {foo: 4, bar: 7}
	})


	test({
		input: 'foo == bar',
		output: true,
		context: {foo: 1, bar: '1'}
	})

	test({
		input: 'foo === bar',
		output: false,
		context: {foo: 1, bar: '1'}
	})

	test({
		input: 'foo != bar',
		output: true,
		context: {foo: 4, bar: 7}
	})

	test({
		input: 'foo !== bar',
		output: true,
		context: {foo: 4, bar: 7}
	})

})