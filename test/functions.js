describe('Function', function () {
	test = require('./_util')(it)

	test('x = function () {}')
		.test_async()
		.test(function (result, callback) {
			result(function (err) {
				callback(err, true);
			})
		})

	test('x = function () { return 42; }')
		.test_async()
		.test(function (result, callback) {
			result(function (err, number) {
				assert.equal(number, 42)
				callback(err, true);
			})
		})

	test('(function (name) { return name; })("bob")')

	test('(function () { return name; })()')
		.context({name: 'bob'})

	test('(function (middle) { return bottom = 2 * middle; })(15)')
		.context({
			top: 10,
			middle: 20
		})
		.test(function (result) {
			assert.equal(this.context.middle, 20, 'Parent context was modified')
			assert.equal(this.context.bottom, undefined, 'Child context set incorrectly on parent context')
		})

	test('person = new Person("Richard")')
		.context({
			Person: function (name) { this.name = name; }
		})
		.cmp('json')

	test('person = new Person("Richard"); person.name();')
		.context({
			Person: (function() {
				Person.name = 'Person';

				function Person(name) {
					this._name = name;
				}

				Person.prototype.name = function(name) {
					if (name) this._name = name;
					return this._name;
				};

				return Person;
			})()
		})
		.cmp('json')



})