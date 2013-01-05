class App.UsersController extends App.ApplicationController
  @param 'username'
  @param 'email'
  @param 'password'

  @scope 'all'

  @beforeAction 'setContentType'
  setContentType: ->
    @headers['Content-Type'] = "application/json; charset=UTF-8"

  index: ->
    App.User.all (err, users) =>
      if err
        @render json:{stat: 'fail'}
      else
        @render json:{stat: 'ok', users:users}
        

  create: ->
    console.log(@params)
    @user = App.User.build(username: @params.username, email: @params.email, password: @params.password)
    @user.save (error) =>
      if error
        @render json:{stat: 'fail'}
      else
        @render json:{stat: 'ok', user: @user}
        