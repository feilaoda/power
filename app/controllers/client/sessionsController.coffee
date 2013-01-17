class App.SessionsController extends Tower.Controller
  @scope 'all'

  # @todo refactor
  destroy: ->
    @get('resource').destroy()
