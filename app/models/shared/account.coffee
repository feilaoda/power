class App.Account extends Tower.Model
  @field 'provider', type: 'String'
  @field 'uid', type: 'Integer'
  @field 'name', type: 'String'
  @belongsTo 'user', type: 'User'
  @timestamps()
