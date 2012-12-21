@title = "Project"

partial "flash"

text '{{#with resource}}'
dl class: "content", ->
  dt "Title:"
  dd '{{title}}'
  dt "Create time:"
  dd '{{createTime}}'
text '{{/with}}'