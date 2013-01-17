(function() {

  Tower.Factory.define('session', function() {
    return {
      username: Tower.random('userName')
    };
  });

}).call(this);
