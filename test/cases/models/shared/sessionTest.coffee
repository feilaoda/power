describe 'App.Session', ->
  session = undefined

  describe 'fields', ->
    beforeEach (done) ->
      session = App.Session.build
        provider: 'A provider'
        uid: 'A uid'
        username: 'A username'

      done()

    test 'provider', ->
      assert.ok session.get('provider')

    test 'uid', ->
      assert.ok session.get('uid')

    test 'username', ->
      assert.ok session.get('username')

  describe 'relations', ->
