
tableFor 'users', (t) ->
  t.head ->
    t.row ->
      t.header 'username', sort: true
      t.header 'email', sort: true
      t.header 'password', sort: true
      t.header 'createTime', sort: true
  t.body ->
    text '{{#each user in App.usersController.all}}'
    t.row class: 'user', ->
      t.cell '{{user.username}}'
      t.cell '{{user.email}}'
      t.cell '{{user.password}}'
      t.cell '{{user.createTime}}'
      t.cell ->
        a '{{action showUser user href=true}}', 'Show'
        span '|'
        a '{{action editUser user href=true}}', 'Edit'
        span '|'
        a '{{action destroyUser user}}', 'Destroy'
    text '{{/each}}'
  t.foot ->
    t.row ->
      t.cell colspan: 7, ->
        a '{{action newUser user href=true}}', 'New User'

