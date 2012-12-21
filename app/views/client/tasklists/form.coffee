App.TasklistsEditView = Ember.View.extend
  templateName: 'tasklists/edit'
  resourceBinding: 'controller.resource'
  # You can also use an object controller (Ember.ObjectProxy) 
  # as a layer between the view and the model if you'd like more control.
  # resourceControllerBinding: 'controller.resourceController'
  
  submit: (event) ->
    # @todo
    # if @get('resource.isNew')
    #   @get('controller.target').send('createTasklist')
    # else
    #   @get('controller.target').send('updateTasklist', @get('resource'))
    @get('resource').save()
    Tower.router.transitionTo('tasklists.index')
    return false
