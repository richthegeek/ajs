describe('Assignments', function () {
	test = require('./_util')(it)
	test('x = 45')
		.test(function (result) {
			assert.equal(this.context.x, 45)
		})

	test('person.age = 25')
		.context({person: {}})
		.test(function (result) {
			assert.equal(this.context.person.age, 25)
		})

	test('x += 10')
		.context({x: 5})
		.test(function (result) {
			assert.equal(this.context.x, 15)
		})
})