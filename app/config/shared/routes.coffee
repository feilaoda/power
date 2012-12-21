Tower.Route.draw ->
  
  @resources 'tasklists'
  @resources 'users'
  @resources 'projects' 
  @resources 'tasks'

  # @match '(/*path)', to: 'application#index'
  @namespace 'api', ->
    @match 'projects', to: 'projects#all',
        'projects/:id', to: 'projects#show'
     
  @match '/', to: 'application#welcome'
