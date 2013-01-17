a 'href="/#/projects"', class: 'brand', -> t('title')

div class: 'nav-collapse', ->
  ul class: 'nav', ->
    li '{{bindAttr class="App.SessionController.isActive:active"}}', ->
      a '{{action indexSession href=true}}', t('links.sessions')
   
    li '{{bindAttr class="App.ProjectController.isActive:active"}}', ->
      a 'href="/#/projects"', t('links.projects')
    li '{{bindAttr class="App.UserController.isActive:active"}}', ->
      a 'href="/#/users"', t('links.users')
  
