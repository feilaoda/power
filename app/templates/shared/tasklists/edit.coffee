@title = "Editing Tasklist"

partial "flash"
partial "form"

contentFor "sidebar", ->
  header class: "widget header", ->
    h2 @tasklist.toLabel()