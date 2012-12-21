Tower.Factory.define 'user', ->
  username: Tower.random('userName')
  email: Tower.random('email')
