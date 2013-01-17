describe 'SessionsController', ->
  controller = undefined
  session = undefined
  url = undefined

  beforeEach (done) ->
    controller = App.SessionsController.create()
    agent.controller = controller
    Tower.start(done)

  afterEach ->
    Tower.stop()
    delete agent.controller

  describe 'routes', ->
    test 'index', ->
      assert.equal urlFor(App.Session), "/sessions"

    test 'new', ->
      session = App.Session.build()
      assert.equal urlFor(session, action: 'new'), "/sessions/new"

    test 'show', ->
      session = new App.Session(id: 1)
      assert.equal urlFor(session), "/sessions/#{session.get('id')}"

    test 'edit', ->
      session = new App.Session(id: 1)
      assert.equal urlFor(session, action: 'edit'), "/sessions/#{session.get('id')}/edit"

  describe '#index', ->
    beforeEach (done) ->
      factory 'session', (error, record) =>
        session = record
        done()

    test 'render json', (done) ->
      get urlFor(App.Session), format: "json", (request) ->
        assert.equal @headers["Content-Type"], 'application/json'

        done()

  describe '#new', ->

  describe '#create', ->
    beforeEach ->
      url = urlFor(App.Session)

    test 'params', (done) ->
      params = {}

      post url, format: "json", params: params, (response) ->
        App.Session.count (error, count) =>
          assert.equal count, 1
          done()

  describe "#show", ->

  describe "#edit", ->

  describe "#update", ->

  describe "#destroy", ->
