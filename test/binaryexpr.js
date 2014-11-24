
describe('Binary Expressions', function () {
	test = require('./_util')(it)

	ctx_47 = {foo: 4, bar: 7}
	ctx_11 = {foo: 1, bar: '1'}

	test('foo + bar').context(ctx_47)
	test('foo < bar').context(ctx_47)
	
	test('foo == bar').context(ctx_11)
	test('foo === bar').context(ctx_11)
	test('foo != bar').context(ctx_11)
	test('foo !== bar').context(ctx_11)

})