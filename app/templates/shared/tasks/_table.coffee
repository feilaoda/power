
tableFor 'tasks', (t) ->
  t.head ->
    t.row ->
      t.header 'title', sort: true
  t.body ->
    text '{{#each task in App.tasksController.all}}'
    t.row class: 'task', ->
      t.cell '{{task.title}}'
      t.cell ->
        a '{{action showTask task href=true}}', 'Show'
        span '|'
        a '{{action editTask task href=true}}', 'Edit'
        span '|'
        a '{{action destroyTask task}}', 'Destroy'
    text '{{/each}}'
  t.foot ->
    t.row ->
      t.cell colspan: 4, ->
        a '{{action newTask task href=true}}', 'New Task'

