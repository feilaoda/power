li class: "tasklist", ->
  header class: "header", ->
    h3 @tasklist.toLabel()
  dl class: "content", ->
    dt "Title:"
    dd @tasklist.get("title")
  footer class: "footer", ->
    menu ->
      menuItem "Edit", urlFor(@tasklist, action: "edit")
