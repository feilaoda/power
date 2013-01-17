li class: "session", ->
  header class: "header", ->
    h3 @session.toLabel()
  dl class: "content", ->
    dt "Provider:"
    dd @session.get("provider")
    dt "Uid:"
    dd @session.get("uid")
    dt "Username:"
    dd @session.get("username")
  footer class: "footer", ->
    menu ->
      menuItem "Edit", urlFor(@session, action: "edit")
