(function() {
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

  App.Member = (function(_super) {
    var Member;

    function Member() {
      return Member.__super__.constructor.apply(this, arguments);
    }

    Member = __extends(Member, _super);

    Member.field('username', {
      type: 'String'
    });

    Member.field('email', {
      type: 'String'
    });

    Member.belongsTo('project', {
      type: 'Project'
    });

    Member.belongsTo('user', {
      type: 'User'
    });

    Member.hasMany('projects');

    return Member;

  })(Tower.Model);

}).call(this);
