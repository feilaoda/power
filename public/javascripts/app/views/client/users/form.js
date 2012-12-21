(function() {

  App.UsersEditView = Ember.View.extend({
    templateName: 'users/edit',
    resourceBinding: 'controller.resource',
    submit: function(event) {
      this.get('resource').save();
      Tower.router.transitionTo('users.index');
      return false;
    }
  });

}).call(this);
