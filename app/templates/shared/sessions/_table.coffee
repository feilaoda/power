
tableFor 'sessions', (t) ->
  t.head ->
    t.row ->
      t.header 'provider', sort: true
      t.header 'uid', sort: true
      t.header 'username', sort: true
  t.body ->
    text '{{#each session in App.sessionsController.all}}'
    t.row class: 'session', ->
      t.cell '{{session.provider}}'
      t.cell '{{session.uid}}'
      t.cell '{{session.username}}'
      t.cell ->
        a '{{action showSession session href=true}}', 'Show'
        span '|'
        a '{{action editSession session href=true}}', 'Edit'
        span '|'
        a '{{action destroySession session}}', 'Destroy'
    text '{{/each}}'
  t.foot ->
    t.row ->
      t.cell colspan: 6, ->
        a '{{action newSession session href=true}}', 'New Session'

