class App.Token extends Tower.Model
  @field 'provider', type: 'String'
  @field 'url', type: 'String'
  @field 'accessToken', type: 'String'
  @field 'name', type: 'String'
  @belongsTo 'user', type: 'User'
  @timestamps()
