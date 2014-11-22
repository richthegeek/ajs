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

	constructor: (@target, @context = {}, @options = {}) ->
		@options.inferCallbacks ?= true
		@context.this ?= target

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

	get: (keys, source, failback, callback) ->

		if source?.__get?
			fn = source.__get.bind(source)
		else
			fn = (key, next) =>
				next null, source[key]

		@each keys, fn, (err, res) ->
			if err then failback err, res
			callback null, res

class Evaluator.Return
	constructor: (@value) ->
		null
