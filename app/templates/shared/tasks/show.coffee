@title = "Task"

partial "flash"

text '{{#with resource}}'
dl class: "content", ->
  dt "Title:"
  dd '{{title}}'
text '{{/with}}'