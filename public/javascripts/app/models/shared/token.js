var __hasProp = {}.hasOwnProperty,
  __extends =   function(child, parent) {
    if (typeof parent.__extend == 'function') return parent.__extend(child);
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } 
    function ctor() { this.constructor = child; } 
    ctor.prototype = parent.prototype; 
    child.prototype = new ctor; 
    child.__super__ = parent.prototype; 
    if (typeof parent.extended == 'function') parent.extended(child); 
    return child; 
};

App.Token = (function(_super) {
  var Token;

  function Token() {
    return Token.__super__.constructor.apply(this, arguments);
  }

  Token = __extends(Token, _super);

  Token.field('provider', {
    type: 'String'
  });

  Token.field('url', {
    type: 'String'
  });

  Token.field('accessToken', {
    type: 'String'
  });

  Token.field('name', {
    type: 'String'
  });

  Token.belongsTo('user', {
    type: 'User'
  });

  Token.timestamps();

  return Token;

})(Tower.Model);
