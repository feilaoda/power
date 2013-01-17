text '{{#with resource}}'
form ->
  fieldset ->
    ul class: 'fields', ->
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Provider:'
          text '{{view Ember.TextField valueBinding="provider"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{provider}}'
          text '{{/with}}'
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Uid:'
          text '{{view Ember.TextField valueBinding="uid"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{uid}}'
          text '{{/with}}'
      li class: 'control-group', ->
        div class: 'controls', ->
          label 'Username:'
          text '{{view Ember.TextField valueBinding="username"}}'
          text '{{#with errors}}'
          span class: 'help-inline error', '{{username}}'
          text '{{/with}}'
      li ->
        a '{{action submit target="resource"}}', 'Submit'
text '{{/with}}'
