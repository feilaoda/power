(function() {

  Tower.Factory.define('task', function() {
    return {
      title: Tower.random('words')
    };
  });

}).call(this);
