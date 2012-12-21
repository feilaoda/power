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

  App.Tasklist = (function(_super) {
    var Tasklist;

    function Tasklist() {
      return Tasklist.__super__.constructor.apply(this, arguments);
    }

    Tasklist = __extends(Tasklist, _super);

    Tasklist.field('title', {
      type: 'String'
    });

    Tasklist.belongsTo('project', {
      type: 'Project'
    });

    Tasklist.hasMany('tasks');

    Tasklist.timestamps();

    return Tasklist;

  })(Tower.Model);

}).call(this);
