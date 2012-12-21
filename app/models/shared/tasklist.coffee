class App.Tasklist extends Tower.Model
  @field 'title', type: 'String'

  @belongsTo 'project', type: 'Project'
  @hasMany 'tasks' 
  
  @timestamps()
