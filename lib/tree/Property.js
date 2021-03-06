// Generated by CoffeeScript 1.7.1
(function() {
  module.exports = function(node, callback) {
    return this.recurse(node.value, node, callback, function(err, value) {
      var key;
      if (node.key.type === 'Literal') {
        key = node.key.value;
      } else if (node.key.type === 'Identifier') {
        key = node.key.name;
      } else {
        return callback('Property: invalid key type ' + node.key.type);
      }
      return node.context.set(key, value, callback);
    });
  };

}).call(this);

//# sourceMappingURL=Property.map
