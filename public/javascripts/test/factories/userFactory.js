(function() {

  Tower.Factory.define('user', function() {
    return {
      username: Tower.random('userName'),
      email: Tower.random('email')
    };
  });

}).call(this);
