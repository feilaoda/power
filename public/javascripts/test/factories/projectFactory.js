(function() {

  Tower.Factory.define('project', function() {
    return {
      title: Tower.random('words')
    };
  });

}).call(this);
