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

  App.Task = (function(_super) {
    var Task;

    function Task() {
      return Task.__super__.constructor.apply(this, arguments);
    }

    Task = __extends(Task, _super);

    Task.field('title', {
      type: 'String'
    });

    Task.field('status', {
      type: 'String'
    });

    Task.belongsTo('project', {
      type: 'Project'
    });

    Task.belongsTo('tasklist', {
      type: 'Tasklist'
    });

    Task.timestamps();

    Task.belongsTo('user', {
      type: 'User'
    });

    return Task;

  })(Tower.Model);

}).call(this);
