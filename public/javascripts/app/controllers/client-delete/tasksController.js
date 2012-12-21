(function() {
  var __defineProperty = function(clazz, key, value) {
  if (typeof clazz.__defineProperty == 'function') return clazz.__defineProperty(key, value);
  return clazz.prototype[key] = value;
},
    __hasProp = {}.hasOwnProperty,
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

  App.TasksController = (function(_super) {
    var TasksController;

    function TasksController() {
      return TasksController.__super__.constructor.apply(this, arguments);
    }

    TasksController = __extends(TasksController, _super);

    TasksController.scope('all');

    __defineProperty(TasksController,  "destroy", function() {
      return this.get('resource').destroy();
    });

    return TasksController;

  })(Tower.Controller);

}).call(this);
