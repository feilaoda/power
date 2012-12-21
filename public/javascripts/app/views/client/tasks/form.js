(function() {

  App.TasksEditView = Ember.View.extend({
    templateName: 'tasks/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('tasks.index');
      return false;
    }
  });

}).call(this);
