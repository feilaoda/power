describe 'App.User', ->
  user = undefined

  describe 'fields', ->
    beforeEach (done) ->
      user = App.User.build
        username: 'A username'
        email: 'A email'
        password: 'A password'
        createTime: 'A createTime'

      done()

    test 'username', ->
      assert.ok user.get('username')

    test 'email', ->
      assert.ok user.get('email')

    test 'password', ->
      assert.ok user.get('password')

    test 'createTime', ->
      assert.ok user.get('createTime')

  describe 'relations', ->
