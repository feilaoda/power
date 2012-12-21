
tableFor 'tasklists', (t) ->
  t.head ->
    t.row ->
      t.header 'title', sort: true
  t.body ->
    text '{{#each tasklist in App.tasklistsController.all}}'
    t.row class: 'tasklist', ->
      t.cell '{{tasklist.title}}'
      t.cell ->
        a '{{action showTasklist tasklist href=true}}', 'Show'
        span '|'
        a '{{action editTasklist tasklist href=true}}', 'Edit'
        span '|'
        a '{{action destroyTasklist tasklist}}', 'Destroy'
    text '{{/each}}'
  t.foot ->
    t.row ->
      t.cell colspan: 4, ->
        a '{{action newTasklist tasklist href=true}}', 'New Tasklist'

