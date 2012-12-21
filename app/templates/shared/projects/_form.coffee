text '{{#with resource}}'
form ->
  fieldset ->
    ul class: 'fields', ->
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Title:'
          text '{{view Ember.TextField valueBinding="title"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{title}}'
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
