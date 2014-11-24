
describe('Unary', function () {
	test = require('./_util')(it)
	test('-3')

	test('+3')

	test('!true')
	
	test('typeof 13')

	test('void(x = 4)')
		.test(function (result) {
			assert.equal(result, undefined, 'Void did not return "undefined"')
			assert.equal(this.context.x, 4, 'Did not execute expression properly')
		})

	test('delete foo')
		.context({foo: '42'})
		.test(function (result) {
			assert.equal(this.context.foo, undefined, 'Failed to delete "foo" from context')
		})
})