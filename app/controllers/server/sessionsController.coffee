class App.SessionsController extends App.ApplicationController
  @param 'provider'
  @param 'uid'
  @param 'username'

  @scope 'all'

  @beforeAction 'setContentType'

  setContentType: ->
    @headers['Content-Type'] = "application/json; charset=UTF-8"


  create: ->
    App.User.findOrCreateFromSession @request.authHash, (error, user) =>
      if error || user == null
        return @render json:{stat: 'fail'}
      
      @response.cookie 'user', user.get('id'), 
        expires: new Date(Date.now() + 15*24*60*60*1000)
        httpOnly: false
      
      @response.redirect "/"

