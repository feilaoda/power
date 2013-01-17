class App.ApplicationController extends Tower.Controller
  @layout 'application'

  @param 'page', type: 'Number', allowRange: false, allowNegative: false
  @param 'limit', type: 'Number', allowRange: false, allowNegative: false
  @param 'sort', type: 'Order'
  @param 'fields', type: 'Array'
  @param 'createdAt', type: 'Date'
  @param 'updatedAt', type: 'Date'

  @beforeAction 'bootstrap'#, only: 'welcome'

  @beforeAction 'authCheck'
  authCheck: ->
    userId = @request.cookies.user
    if userId == null || userId == undefined
      return @render json:{user: userId}

  welcome: -> 
    @render 'welcome', locals: {@bootstrapData}
    # userId = @request.cookies.user
    # if userId == null || userId == undefined
    #   #@response.redirect "/login"
    #   return @render json:{user: userId}
    # return @render json:{user: userId}

    

  # Example of how you might bootstrap a one-page application.
  bootstrap: (callback) ->
    data = @bootstrapData = {}

    # for every model you add, you can add it to the bootstrap
    # dataset by using this async helper.
    _.series [
      # (next) => App.Session.all (error, sessions) =>
      #   data.sessions = sessions
      #   next()
      # (next) => App.Tasklist.all (error, tasklists) =>
      #   data.tasklists = tasklists
      #   next()
      # (next) => App.Task.all (error, tasks) =>
      #   data.tasks = tasks
      #   next()
      # (next) => App.User.all (error, users) =>
      #   data.users = users
      #   next()
      # (next) => App.Project.all (error, projects) =>
      #   data.projects = projects
      #   next()
    ], callback
