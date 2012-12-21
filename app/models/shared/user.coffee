class App.User extends Tower.Model
  @field 'username', type: 'String'
  @field 'email', type: 'String'
  @field 'password', type: 'String'
  @field 'createTime', type: 'Date'

  @timestamps()
