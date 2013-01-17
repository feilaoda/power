@title = "Editing Session"

partial "flash"
partial "form"

contentFor "sidebar", ->
  header class: "widget header", ->
    h2 @session.toLabel()