class App.Session extends Tower.Model
  @field 'provider', type: 'String'
  @field 'uid', type: 'String'
  @field 'username', type: 'String'

  @timestamps()
