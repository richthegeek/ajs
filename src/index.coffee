acorn = require 'acorn'
fs = require 'fs'
path = require 'path'
nodes = {}

dir = path.resolve(__dirname, './tree')
fs.readdirSync(dir).forEach (file) ->
	if file.match(/\.(js|coffee)$/)
		name = file.split('.').shift()
		nodes[name] = require dir + '/' + file

module.exports = class Evaluator

	constructor: (context = {}, @options = {}) ->
		context.this ?= {}
		if context instanceof Evaluator.Context
			@context = context
		else
			@context = new Evaluator.Context null, context
		@options.inferCallbacks ?= true

		@nodes = {}
		for type, fn of nodes
			@nodes[type] = fn.bind @

		null

	eval: (string, callback) ->
		Evaluator.cache ?= {}
		hash = require('crypto').createHash('md5').update(string).digest('hex')
		ast = Evaluator.cache[hash] || ast = acorn.parse string, @options
		
		evalLine = (line, next) =>
			@recurse line, ast, next, next

		@each ast.body, evalLine, (err, rows) ->
			if Array.isArray rows
				return callback err, rows[rows.length - 1]
			callback err, rows

	recurse: (node, parent, failback, callback) ->
		fn = @nodes[node.type]
		if fn
			node.parent = parent
			node.context = node.context or node.parent.context or @context
			return fn.call @, node, callback

		return failback "Undefined node type: " + node.type

	recurseAll: (list, parent, failback, callback) ->
		fn = (node, next) =>
			@recurse node, parent, next, next

		@each list, fn, (err, list) ->
			if err
				return failback err, list
			else
				callback null, list

	each: (list, fn, callback) ->
		next = (i) =>
			if i >= list.length
				return callback null, list
			
			fn list[i], (err, r) ->
				list[i] = r
				if err
					return callback err, list
				next i + 1
		next(0)

class Evaluator.Context
	constructor: (@parent, @data = {}) ->
		@keys = {}
		Object.keys(@data).forEach (k) => @keys[k] = true
		null

	get: (key, callback) ->
		if @keys[key]
			return callback null, @data[key]

		if @parent
			return @parent.get key, callback

		return callback null, undefined

	set: (key, value, callback) ->
		target = @
		while target
			if target.keys[key]
				return callback null, target.data[key] = value
			target = target.parent

		@keys[key] = true
		return callback null, @data[key] = value

	unset: (key, callback) ->
		target = @
		while target
			if target.keys[key]
				target.keys[key] = false
				return callback null, delete target.data[key]
			target = target.parent

		@keys[key] = false
		return callback null, delete @data[key]	


class Evaluator.Return
	constructor: (@value) ->
		null
