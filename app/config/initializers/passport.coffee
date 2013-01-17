# This will become a plugin
passport = require('passport')

Tower.Auth =
  initialize: (block) ->
    app = Tower.Application.instance()

    app.use passport.initialize()
    app.use passport.session()

    block.call(@, app) if block

    # and this is what you implement in the controller on create and save into the session...
    passport.serializeUser (user, done) ->
      console.log 'serializeUser'
      done null, user.get('id').toString()

    # and on each request
    passport.deserializeUser (id, done) ->
      console.log 'deserializeUser'
      App.User.find id, (error, user) ->
        done error, user

  provider: (name, options = {}) ->
    @["#{name}Strategy"](options)

    app = Tower.Application.instance()

    params        = {}

    params.scope  = [
      'https://www.googleapis.com/auth/userinfo.profile'
      'https://www.googleapis.com/auth/userinfo.email'
    ] if name == 'google'

    app.get "/auth/#{name}", passport.authenticate(name, params)

    app.get "/auth/#{name}/callback", (request, response, next) ->
      passport.authenticate(name, (error, profile, credentials) ->
        provider  = profile.provider
        id        = profile.id
        rawInfo   = profile._json

        delete profile.provider
        delete profile.id
        delete profile._json
        delete profile._raw

        # https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema
        request.authHash =
          provider:     provider
          id:           id
          info:         profile
          credentials:  credentials
          extra:
            rawInfo:    rawInfo

        #response.redirect("/?#{name}=#{profile.id}")
        next()
      )(request, response, next)

  oauth2Strategy: (name, options) ->
    try
      if name == 'google'
        Strategy    = require("passport-#{name}-oauth").OAuth2Strategy
      else
        Strategy    = require("passport-#{name}").Strategy
      credentials = Tower.config.credentials[name]

      if credentials
        options.key ||= credentials.key
        options.secret ||= credentials.secret

      passport.use new Strategy
        clientID:     options.key
        clientSecret: options.secret
        callbackURL:  "http://#{options.url}/auth/#{name}/callback"
        (accessToken, refreshToken, profile, callback) ->
          info =
            accessToken:  accessToken
            refreshToken: refreshToken

          # Then this will go to the /auth/:provider/callback path below,
          # which will then go to the controller!
          callback(null, profile, info)
    catch error
      error.message += " (#{name})"
      throw error

  oauthStrategy: (name, options) ->
    try
      Strategy    = require("passport-#{name}").Strategy
      credentials = Tower.config.credentials[name]

      if credentials
        options.key ||= credentials.key
        options.secret ||= credentials.secret

      passport.use new Strategy
        consumerKey:    options.key
        consumerSecret: options.secret
        callbackURL:    "http://#{options.url}/auth/#{name}/callback"
        (token, tokenSecret, profile, callback) ->
          info =
            key:    token
            secret: tokenSecret

          callback(null, profile, info)
    catch error
      error.message += " (#{name})"
      throw error

  githubStrategy: (options) ->
    @oauth2Strategy('github', options)

  facebookStrategy: (options) ->
    @oauth2Strategy('facebook', options)

  twitterStrategy: (options) ->
    @oauthStrategy('twitter', options)

  googleStrategy: (options) ->
    @oauth2Strategy('google', options)

  linkedinStrategy: (options) ->
    @oauthStrategy('linkedin', options)
