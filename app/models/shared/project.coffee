class App.Project extends Tower.Model
  @field 'title', type: 'String'
  @field 'createTime', type: 'Date'

  @hasMany 'tasklists' 
  @hasMany 'tasks' 
  @timestamps()
