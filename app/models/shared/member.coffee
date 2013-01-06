class App.Member extends Tower.Model

  # @field 'project', type: 'Project'
  # @field 'user', type: 'User'
  @field 'username', type: 'String'
  @field 'email', type: 'String'
  @belongsTo 'project', type: 'Project'
  @belongsTo 'user', type: 'User'

  @hasMany 'projects' 


