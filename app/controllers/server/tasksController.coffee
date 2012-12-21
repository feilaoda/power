class App.TasksController extends App.ApplicationController
  @param 'title'

  @scope 'all'

  @beforeAction 'setContentType'
  setContentType: ->
    @headers['Content-Type'] = "application/json; charset=UTF-8"


  show: ->
    console.log(@params)
    App.Task.find @params.id, (error, task) =>
      if error or task == null
        return @render json:{stat: 'fail', error: '404'}
      @render json:{stat: 'ok', task: task}

  create: ->
    @task = App.Task.build(title: @params.title, status: 'todo')
    tasklistId = @params.tasklistId
    App.Project.find @params.projectId, (error, project) =>
      if error or project == null
        return @render json:{stat: 'fail', error: '404'}

      @task.set('tasklistId', tasklistId)
      @task.set('projectId', project.get('id'))
      @task.save (err) =>
        if err
          @render json:{stat: 'fail'}
        else
          @render json:{stat: 'ok', task: @task}
        
  changes: ->
    App.Task.find @params.taskId, (error, task) =>
      if error or task == null
        return @render json:{stat: 'fail', error: '404'}
      if @params.value == 'done'
        status = 'done'
      else  
        status = 'todo'
      task.updateAttributes {status: status}, (error) =>
        if error
          return @render json:{stat: 'fail', error: 'save task error'}
        @render json:{stat: 'ok'}