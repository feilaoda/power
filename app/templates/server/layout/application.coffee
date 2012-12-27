doctype 5
html 'ng-app': 'power', ->
  head ->
    partial 'layout/meta'
  body role: 'application', ->
    # if browserIs 'ie'
    #   javascriptTag 'http://html5shiv.googlecode.com/svn/trunk/html5.js'
    script type: 'text/x-handlebars', 'data-template-name': 'application', ->
      partial 'layout/body'

    if hasContentFor 'bottom'
      yields 'bottom'

    #script "App.bootstrap(#{JSON.stringify(@bootstrapData, null, [])})" if @bootstrapData
    script "App.bootstrap([])" if @bootstrapData

    footer id: 'footer', class: 'footer', role: 'contentinfo', ->
      div class: 'container', ->
        partial 'layout/footer'