module.exports =
  javascripts:
    application: [
      '/app/config/shared/application'
      '/app/config/client/bootstrap'
      '/app/config/client/watch'
      '/app/config/shared/routes'
      '/app/controllers/client/applicationController'
      #'/templates'
      '/app/views/client/layout/application'
      '/app/models/shared/project'
      # '/app/views/client/projects/form'
      # '/app/views/client/projects/index'
      # '/app/views/client/projects/show'
      # '/app/controllers/client/projectsController'
      '/app/models/shared/user'
      # '/app/views/client/users/form'
      # '/app/views/client/users/index'
      # '/app/views/client/users/show'
      # '/app/controllers/client/usersController'
      '/app/models/shared/task'
      # '/app/views/client/tasks/form'
      # '/app/views/client/tasks/index'
      # '/app/views/client/tasks/show'
      # '/app/controllers/client/tasksController'
      '/app/models/shared/tasklist'
      # '/app/views/client/tasklists/form'
      # '/app/views/client/tasklists/index'
      # '/app/views/client/tasklists/show'
      # '/app/controllers/client/tasklistsController'
      '/app/models/shared/member'
      '/angular/app'
      '/angular/controllers'
      '/angular/services'
      '/angular/filters'
      '/app/powerproject'
      
    ]

    # lib: [

    # ]

    vendor: [
      '/vendor/javascripts/jquery.min'
      '/vendor/javascripts/underscore'
      '/vendor/javascripts/underscore.string'
      '/vendor/javascripts/inflection'
      '/vendor/javascripts/async'
      '/vendor/javascripts/socket.io'
      '/vendor/javascripts/handlebars'
      '/vendor/javascripts/ember'
      '/vendor/javascripts/tower'
      
      #'/vendor/javascripts/jstorage'
      #'/vendor/javascripts/moment'
      #'/vendor/javascripts/geolib'
      #'/vendor/javascripts/validator'
      #'/vendor/javascripts/accounting'

      # '/vendor/javascripts/uri'
      # '/vendor/javascripts/bootstrap/bootstrap-transition'
      # '/vendor/javascripts/bootstrap/bootstrap-alert'
      '/vendor/javascripts/bootstrap/bootstrap-modal'
      # '/vendor/javascripts/bootstrap/bootstrap-dropdown'
      # '/vendor/javascripts/bootstrap/bootstrap-scrollspy'
      # '/vendor/javascripts/bootstrap/bootstrap-tab'
      # '/vendor/javascripts/bootstrap/bootstrap-tooltip'
      # '/vendor/javascripts/bootstrap/bootstrap-popover'
      '/vendor/javascripts/bootstrap/bootstrap-datepicker'
      # '/vendor/javascripts/bootstrap/bootstrap-button'
      # '/vendor/javascripts/bootstrap/bootstrap-collapse'
      # '/vendor/javascripts/bootstrap/bootstrap-carousel'
      # '/vendor/javascripts/bootstrap/bootstrap-typeahead'
      '/vendor/javascripts/prettify'

      '/vendor/javascripts/angular.min'
      '/vendor/javascripts/angular-resource.min'
      '/vendor/javascripts/angular-sanitize.min'
    ]

    development: [
      '/vendor/javascripts/mocha'
      '/vendor/javascripts/chai'
      '/test/client'
      '/test/cases/models/shared/projectTest'
      '/test/cases/models/shared/userTest'
      '/test/cases/models/shared/taskTest'
      '/test/cases/models/shared/tasklistTest'
    ]

  stylesheets:
    application: [
      '/app/stylesheets/client/application'
    ]

    # lib: [

    # ]

    vendor: [
      '/vendor/stylesheets/bootstrap/bootstrap'
      '/vendor/stylesheets/prettify'
    ]

    # development: [
    #   # '/vendor/stylesheets/mocha'
    # ]

  
