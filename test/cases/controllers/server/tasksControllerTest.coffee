describe 'TasksController', ->
  controller = undefined
  task = undefined
  url = undefined

  beforeEach (done) ->
    controller = App.TasksController.create()
    agent.controller = controller
    Tower.start(done)

  afterEach ->
    Tower.stop()
    delete agent.controller

  describe 'routes', ->
    test 'index', ->
      assert.equal urlFor(App.Task), "/tasks"

    test 'new', ->
      task = App.Task.build()
      assert.equal urlFor(task, action: 'new'), "/tasks/new"

    test 'show', ->
      task = new App.Task(id: 1)
      assert.equal urlFor(task), "/tasks/#{task.get('id')}"

    test 'edit', ->
      task = new App.Task(id: 1)
      assert.equal urlFor(task, action: 'edit'), "/tasks/#{task.get('id')}/edit"

  describe '#index', ->
    beforeEach (done) ->
      factory 'task', (error, record) =>
        task = record
        done()

    test 'render json', (done) ->
      get urlFor(App.Task), format: "json", (request) ->
        assert.equal @headers["Content-Type"], 'application/json'

        done()

  describe '#new', ->

  describe '#create', ->
    beforeEach ->
      url = urlFor(App.Task)

    test 'params', (done) ->
      params = {}

      post url, format: "json", params: params, (response) ->
        App.Task.count (error, count) =>
          assert.equal count, 1
          done()

  describe "#show", ->

  describe "#edit", ->

  describe "#update", ->

  describe "#destroy", ->
