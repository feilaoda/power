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

App.Session = (function(_super) {
  var Session;

  function Session() {
    return Session.__super__.constructor.apply(this, arguments);
  }

  Session = __extends(Session, _super);

  Session.field('provider', {
    type: 'String'
  });

  Session.field('uid', {
    type: 'String'
  });

  Session.field('username', {
    type: 'String'
  });

  Session.timestamps();

  return Session;

})(Tower.Model);
