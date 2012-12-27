if hasContentFor 'templates'
  yields 'templates'

nav id: 'navigation', class: 'navbar', role: 'navigation', ->
  div class: 'navbar-inner', ->
    div class: 'container', ->
      partial 'layout/navigation'

header id: 'header', class: 'header', role: 'banner', ->
  div class: 'container', ->
    partial 'layout/header'

section id: 'flash', role: 'banner', ->
  div class: 'container', ->
    partial 'layout/flash'

section id: 'content', ->
  div class: 'container', ->
    text '{{outlet}}\n'
    # yields 'body'
    aside id: 'sidebar', role: 'complementary', ->
      if hasContentFor 'sidebar'
        yields 'sidebar'
section id: 'content', role: 'main', ->
  div class: 'container',  ->
    div 'ng-view', ->
      

