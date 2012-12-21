
tableFor 'projects', (t) ->
  t.head ->
    t.row ->
      t.header 'title', sort: true
      t.header 'createTime', sort: true
  t.body ->
    text '{{#each project in App.projectsController.all}}'
    t.row class: 'project', ->
      t.cell '{{project.title}}'
      t.cell '{{project.createTime}}'
      t.cell ->
        a '{{action showProject project href=true}}', 'Show'
        span '|'
        a '{{action editProject project href=true}}', 'Edit'
        span '|'
        a '{{action destroyProject project}}', 'Destroy'
    text '{{/each}}'
  t.foot ->
    t.row ->
      t.cell colspan: 5, ->
        a '{{action newProject project href=true}}', 'New Project'

