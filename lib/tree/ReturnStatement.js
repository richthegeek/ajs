// Generated by CoffeeScript 1.7.1
(function() {
  module.exports = function(node, callback) {
    return this.recurse(node.argument, node, callback, function(err, result) {
      return callback(err || 'return', result);
    });
  };

}).call(this);

//# sourceMappingURL=ReturnStatement.map
