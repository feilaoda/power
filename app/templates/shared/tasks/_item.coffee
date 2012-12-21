li class: "task", ->
  header class: "header", ->
    h3 @task.toLabel()
  dl class: "content", ->
    dt "Title:"
    dd @task.get("title")
  footer class: "footer", ->
    menu ->
      menuItem "Edit", urlFor(@task, action: "edit")
