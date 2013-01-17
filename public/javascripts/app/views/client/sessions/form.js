(function() {

  App.SessionsEditView = Ember.View.extend({
    templateName: 'sessions/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('sessions.index');
      return false;
    }
  });

}).call(this);
