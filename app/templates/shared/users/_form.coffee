text '{{#with resource}}'
form ->
  fieldset ->
    ul class: 'fields', ->
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Username:'
          text '{{view Ember.TextField valueBinding="username"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{username}}'
          text '{{/with}}'
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Email:'
          text '{{view Ember.TextField valueBinding="email"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{email}}'
          text '{{/with}}'
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Password:'
          text '{{view Ember.TextField valueBinding="password"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{password}}'
          text '{{/with}}'
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Create time:'
          text '{{view Ember.TextField valueBinding="createTime"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{createTime}}'
          text '{{/with}}'
      li ->
        a '{{action submit target="resource"}}', 'Submit'
text '{{/with}}'
