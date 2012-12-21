@title = "User"

partial "flash"

text '{{#with resource}}'
dl class: "content", ->
  dt "Username:"
  dd '{{username}}'
  dt "Email:"
  dd '{{email}}'
  dt "Password:"
  dd '{{password}}'
  dt "Create time:"
  dd '{{createTime}}'
text '{{/with}}'