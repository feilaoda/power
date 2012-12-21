describe 'App.Task', ->
  task = undefined

  describe 'fields', ->
    beforeEach (done) ->
      task = App.Task.build
        title: 'A title'

      done()

    test 'title', ->
      assert.ok task.get('title')

  describe 'relations', ->
