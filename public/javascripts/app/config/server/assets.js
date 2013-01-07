(function() {

  module.exports = {
    javascripts: {
      application: ['/app/config/shared/application', '/app/config/client/bootstrap', '/app/config/client/watch', '/app/config/shared/routes', '/app/controllers/client/applicationController', '/app/views/client/layout/application', '/app/models/shared/project', '/app/models/shared/user', '/app/models/shared/task', '/app/models/shared/tasklist', '/app/models/shared/member', '/angular/app', '/angular/controllers', '/angular/services', '/angular/filters', '/app/powerproject'],
      vendor: ['/vendor/javascripts/jquery.min', '/vendor/javascripts/underscore', '/vendor/javascripts/underscore.string', '/vendor/javascripts/inflection', '/vendor/javascripts/async', '/vendor/javascripts/socket.io', '/vendor/javascripts/handlebars', '/vendor/javascripts/ember', '/vendor/javascripts/tower', '/vendor/javascripts/bootstrap/bootstrap-modal', '/vendor/javascripts/bootstrap/bootstrap-tooltip', '/vendor/javascripts/bootstrap/bootstrap-popover', '/vendor/javascripts/bootstrap/bootstrap-datepicker', '/vendor/javascripts/angular.min', '/vendor/javascripts/angular-resource.min', '/vendor/javascripts/angular-sanitize.min'],
      development: ['/vendor/javascripts/mocha', '/vendor/javascripts/chai', '/test/client', '/test/cases/models/shared/projectTest', '/test/cases/models/shared/userTest', '/test/cases/models/shared/taskTest', '/test/cases/models/shared/tasklistTest']
    },
    stylesheets: {
      application: ['/app/stylesheets/client/application'],
      vendor: ['/vendor/stylesheets/bootstrap/bootstrap', '/vendor/stylesheets/prettify']
    }
  };

}).call(this);
