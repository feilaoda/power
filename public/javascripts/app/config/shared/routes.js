(function() {

  Tower.Route.draw(function() {
    this.resources('tasklists');
    this.resources('users');
    this.resources('projects');
    this.resources('tasks');
    this.resources('members');
    this.match('projects/:id/members', {
      to: 'projects#member'
    });
    this.namespace('api', function() {
      return this.match('projects', {
        to: 'projects#all'
      }, 'projects/:id', {
        to: 'projects#show'
      });
    });
    return this.match('/', {
      to: 'application#welcome'
    });
  });

}).call(this);
