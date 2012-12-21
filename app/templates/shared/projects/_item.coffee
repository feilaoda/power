li class: "project", ->
  header class: "header", ->
    h3 @project.toLabel()
  dl class: "content", ->
    dt "Title:"
    dd @project.get("title")
    dt "Create time:"
    dd @project.get("createTime")
  footer class: "footer", ->
    menu ->
      menuItem "Edit", urlFor(@project, action: "edit")
