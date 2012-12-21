(function() {

  App.TasklistsEditView = Ember.View.extend({
    templateName: 'tasklists/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('tasklists.index');
      return false;
    }
  });

}).call(this);
