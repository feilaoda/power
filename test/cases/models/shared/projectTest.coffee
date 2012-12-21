describe 'App.Project', ->
  project = undefined

  describe 'fields', ->
    beforeEach (done) ->
      project = App.Project.build
        title: 'A title'
        createTime: 'A createTime'

      done()

    test 'title', ->
      assert.ok project.get('title')

    test 'createTime', ->
      assert.ok project.get('createTime')

  describe 'relations', ->
