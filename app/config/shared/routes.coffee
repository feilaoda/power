Tower.Route.draw ->
  
  @resources 'tasklists'
  @resources 'users'
  @resources 'projects'
  @resources 'tasks'
  @resources 'members'

  # @resources 'tasks', ->
  #   @post 'changes'

  # @match '(/*path)', to: 'application#index'
  
  @match 'projects/:id/members', to: 'projects#member',

  @namespace 'api', ->
    @match 'projects', to: 'projects#all',
        'projects/:id', to: 'projects#show'
     
  @match '/', to: 'application#welcome'
