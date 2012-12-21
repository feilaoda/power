describe 'UsersController', ->
  controller = undefined
  user = undefined
  url = undefined

  beforeEach (done) ->
    controller = App.UsersController.create()
    agent.controller = controller
    Tower.start(done)

  afterEach ->
    Tower.stop()
    delete agent.controller

  describe 'routes', ->
    test 'index', ->
      assert.equal urlFor(App.User), "/users"

    test 'new', ->
      user = App.User.build()
      assert.equal urlFor(user, action: 'new'), "/users/new"

    test 'show', ->
      user = new App.User(id: 1)
      assert.equal urlFor(user), "/users/#{user.get('id')}"

    test 'edit', ->
      user = new App.User(id: 1)
      assert.equal urlFor(user, action: 'edit'), "/users/#{user.get('id')}/edit"

  describe '#index', ->
    beforeEach (done) ->
      factory 'user', (error, record) =>
        user = record
        done()

    test 'render json', (done) ->
      get urlFor(App.User), format: "json", (request) ->
        assert.equal @headers["Content-Type"], 'application/json'

        done()

  describe '#new', ->

  describe '#create', ->
    beforeEach ->
      url = urlFor(App.User)

    test 'params', (done) ->
      params = {}

      post url, format: "json", params: params, (response) ->
        App.User.count (error, count) =>
          assert.equal count, 1
          done()

  describe "#show", ->

  describe "#edit", ->

  describe "#update", ->

  describe "#destroy", ->
