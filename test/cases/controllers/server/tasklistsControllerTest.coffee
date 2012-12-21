describe 'TasklistsController', ->
  controller = undefined
  tasklist = undefined
  url = undefined

  beforeEach (done) ->
    controller = App.TasklistsController.create()
    agent.controller = controller
    Tower.start(done)

  afterEach ->
    Tower.stop()
    delete agent.controller

  describe 'routes', ->
    test 'index', ->
      assert.equal urlFor(App.Tasklist), "/tasklists"

    test 'new', ->
      tasklist = App.Tasklist.build()
      assert.equal urlFor(tasklist, action: 'new'), "/tasklists/new"

    test 'show', ->
      tasklist = new App.Tasklist(id: 1)
      assert.equal urlFor(tasklist), "/tasklists/#{tasklist.get('id')}"

    test 'edit', ->
      tasklist = new App.Tasklist(id: 1)
      assert.equal urlFor(tasklist, action: 'edit'), "/tasklists/#{tasklist.get('id')}/edit"

  describe '#index', ->
    beforeEach (done) ->
      factory 'tasklist', (error, record) =>
        tasklist = record
        done()

    test 'render json', (done) ->
      get urlFor(App.Tasklist), format: "json", (request) ->
        assert.equal @headers["Content-Type"], 'application/json'

        done()

  describe '#new', ->

  describe '#create', ->
    beforeEach ->
      url = urlFor(App.Tasklist)

    test 'params', (done) ->
      params = {}

      post url, format: "json", params: params, (response) ->
        App.Tasklist.count (error, count) =>
          assert.equal count, 1
          done()

  describe "#show", ->

  describe "#edit", ->

  describe "#update", ->

  describe "#destroy", ->
