describe 'App.Tasklist', ->
  tasklist = undefined

  describe 'fields', ->
    beforeEach (done) ->
      tasklist = App.Tasklist.build
        title: 'A title'

      done()

    test 'title', ->
      assert.ok tasklist.get('title')

  describe 'relations', ->
