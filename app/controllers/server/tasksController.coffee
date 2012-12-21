class App.TasksController extends App.ApplicationController
  @param 'title'

  @scope 'all'


  create: ->
    @task = App.Task.build(title: @params.title, status: 'todo')
    tasklistId = @params.tasklistId
    App.Project.find @params.projectId, (error, project) =>
      if error or project == null
        @render json:{stat: 'fail', error: '404'}

      @task.set('tasklistId', tasklistId)
      @task.set('projectId', project.get('id'))
      @task.save (err, task) =>
        if err
          @render json:{stat: 'fail'}
        else
          @render json:{stat: 'ok', task: @task}
        