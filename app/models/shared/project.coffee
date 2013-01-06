class App.Project extends Tower.Model
  @field 'title', type: 'String'

  @hasMany 'tasklists' 
  @hasMany 'tasks'
  @hasMany 'members'
  
  @timestamps()

  @belongsTo 'master', type: 'User'
