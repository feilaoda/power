class App.User extends Tower.Model
  @field 'username', type: 'String'
  @field 'email', type: 'String'
  @field 'password', type: 'String'
  @field 'displayName', type: 'String'

  @timestamps()

  @hasMany 'projects'
  @hasMany 'tasklists'
  @hasMany 'tasks'

  @findOrCreateFromSession: (data, callback) ->
    console.log("create", data)
    @findFromSession data, (error, user) =>
      if !error && user && user instanceof Tower.Model 
        callback.call(@, error, user)
      else
        @createFromSession(data, callback)


  @findFromSession: (data, callback) ->
    provider = data.provider
    accessToken = data.credentials['accessToken']
    username = data.info['username']

    App.Token.where(provider:provider, accessToken:accessToken).first   (error, token) =>
      if error || token == null
        App.Account.where(provider:provider, name:username).first  (error, account) =>
          if error || account == null
            return callback.call(@, error, null)
          App.User.find account.get('userId'), (error, user) =>
            return callback.call(@, error, user)
        return


      App.User.find  token.get('userId'), (error, user) =>
        callback.call(@, error, user)


  @createFromSession: (data, callback) ->
    username = ''
    provider = data.provider
    if provider == 'github'
      username = data.info['username']
    

    @user = App.User.build()
    @user.set('username', username)
    emails = data.info['emails']
    console.log(data.info)
    email = ""
    if emails != null && emails.length > 0
      email = emails[0]['value']
    @user.set('email', email)
    @user.set('displayName', data.info['displayName'])
    
    @user.save  (error) =>
      if error
        return @render json:{stat: 'fail'}
      attrs = {}
      attrs['provider'] = data.provider
      attrs['accessToken'] = data.credentials['accessToken']
      attrs['userId'] = @user.get('id')
      attrs['name'] = username
      App.Token.create attrs, (error, token) =>
        if error || token == null
          return callback.call(@, error, null)
        callback.call(@, error, @user)
  
      attrs2 = {}
      attrs2['provider'] = provider
      attrs2['userId'] = @user.get('id')
      attrs2['name'] = username
      attrs2['uid'] = data.id      
      App.Account.where(provider:provider, uid: data.id, name:username).first  (error, account) =>
        if account == null
          return App.Account.create attrs2, (error, newAccount) =>
            return
        attrs3 = {}
        attrs3['userId'] = @user.get('id')
        account.updateAttributes attrs3, (error) =>
            true
