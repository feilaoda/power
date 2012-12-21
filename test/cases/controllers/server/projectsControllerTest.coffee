describe 'ProjectsController', ->
  controller = undefined
  project = undefined
  url = undefined

  beforeEach (done) ->
    controller = App.ProjectsController.create()
    agent.controller = controller
    Tower.start(done)

  afterEach ->
    Tower.stop()
    delete agent.controller

  describe 'routes', ->
    test 'index', ->
      assert.equal urlFor(App.Project), "/projects"

    test 'new', ->
      project = App.Project.build()
      assert.equal urlFor(project, action: 'new'), "/projects/new"

    test 'show', ->
      project = new App.Project(id: 1)
      assert.equal urlFor(project), "/projects/#{project.get('id')}"

    test 'edit', ->
      project = new App.Project(id: 1)
      assert.equal urlFor(project, action: 'edit'), "/projects/#{project.get('id')}/edit"

  describe '#index', ->
    beforeEach (done) ->
      factory 'project', (error, record) =>
        project = record
        done()

    test 'render json', (done) ->
      get urlFor(App.Project), format: "json", (request) ->
        assert.equal @headers["Content-Type"], 'application/json'

        done()

  describe '#new', ->

  describe '#create', ->
    beforeEach ->
      url = urlFor(App.Project)

    test 'params', (done) ->
      params = {}

      post url, format: "json", params: params, (response) ->
        App.Project.count (error, count) =>
          assert.equal count, 1
          done()

  describe "#show", ->

  describe "#edit", ->

  describe "#update", ->

  describe "#destroy", ->
