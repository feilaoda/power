class App.Task extends Tower.Model
  @field 'title', type: 'String'
  @field 'status', type: 'String'
  @field 'planedAt', type: 'Date'
  @field 'completedAt', type: 'Date'

  @belongsTo 'project', type: 'Project'
  @belongsTo 'tasklist', type: 'Tasklist'
  
  @timestamps()

  @belongsTo 'user', type: 'User'
