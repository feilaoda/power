li class: "user", ->
  header class: "header", ->
    h3 @user.toLabel()
  dl class: "content", ->
    dt "Username:"
    dd @user.get("username")
    dt "Email:"
    dd @user.get("email")
    dt "Password:"
    dd @user.get("password")
    dt "Create time:"
    dd @user.get("createTime")
  footer class: "footer", ->
    menu ->
      menuItem "Edit", urlFor(@user, action: "edit")
