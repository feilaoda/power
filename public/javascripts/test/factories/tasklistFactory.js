(function() {

  Tower.Factory.define('tasklist', function() {
    return {
      title: Tower.random('words')
    };
  });

}).call(this);
