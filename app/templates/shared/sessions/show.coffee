@title = "Session"

partial "flash"

text '{{#with resource}}'
dl class: "content", ->
  dt "Provider:"
  dd '{{provider}}'
  dt "Uid:"
  dd '{{uid}}'
  dt "Username:"
  dd '{{username}}'
text '{{/with}}'