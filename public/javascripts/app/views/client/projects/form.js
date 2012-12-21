(function() {

  App.ProjectsEditView = Ember.View.extend({
    templateName: 'projects/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('projects.index');
      return false;
    }
  });

}).call(this);
