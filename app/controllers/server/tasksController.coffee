class App.TasksController extends App.ApplicationController
  @param 'title'
  @param 'planedAt', type: 'Date'
  @param 'completedAt', type: 'Date'
   
  @scope 'all'

  @beforeAction 'setContentType'
  setContentType: ->
    @headers['Content-Type'] = "application/json; charset=UTF-8"


  show: ->
    App.Project.find @params.projectId, (error, project) =>
      if error or project == null
          return @render json:{stat: '404', error: 'project not found'}
      @project = project
      App.Task.find @params.id, (error, task) =>
        if error or task == null or task.get('projectId').toString() != @project.get('id').toString()
          return @render json:{stat: '404', error: 'task  not found'}
        @task = task
        App.Tasklist.find  @task.get('tasklistId'), (error,tasklist) =>
          if error or tasklist == null
            return @render json:{stat: '404', error: 'tasklist  not found'}
          console.log(tasklist)
          @render json:{stat: 'ok', project: @project, tasklist:tasklist, task: @task}

  create: ->
    @task = App.Task.build(title: @params.title, status: 'todo')
    tasklistId = @params.tasklistId
    App.Project.find @params.projectId, (error, project) =>
      if error or project == null
        return @render json:{stat: '404', error: 'project  not found'}

      @task.set('tasklistId', tasklistId)
      @task.set('projectId', project.get('id'))
      @task.save (error) =>
        if error
          @render json:{stat: 'fail', error: error}
        else
          @render json:{stat: 'ok', task: @task}
        

  destroy: ->
    console.log(@params)
    App.Task.find @params.id, (error, task) =>
      if error or task == null
        return @render json:{stat: '404', error: 'task  not found'}
      @task = task
      App.Project.find @params.projectId, (error, project) =>
        if error or project == null
          return @render json:{stat: '404', error: 'project  not found'}

        @task.destroy (error) =>
          if error
            return @render json:{stat: 'fail', error: error}
          return @render json:{stat: 'ok'}
        

  update: ->
    now = new Date()
    App.Task.find @params.id, (error, task) =>
      if error or task == null
        return @render json:{stat: '404', error: 'task  not found'}
      attrs = {}
      if @params.status != undefined
        if @params.status == 'done'
          status = 'done'
          completedAt = now.getTime()
          attrs['completedAt'] = completedAt
        else
          status = 'todo'
          attrs['completedAt'] = null
        attrs['status'] = status
      if @params.title != undefined
        attrs['title'] = @params.title
      if @params.planedAt != undefined
        planedAt = null
        if @params.planedAt != ""
          planedAt = new Date(@params.planedAt)
        attrs['planedAt'] = planedAt
  
      if @params.userId != undefined
        if @params.userId == ""
          attrs['userId'] = null
          attrs['username'] = null
          task.updateAttributes attrs, (error) =>
            if error
              return @render json:{stat: 'fail', error: error}
            return @render json:{stat: 'ok', task: task}
        else
          App.User.find @params.userId,(error, user)=>
            if error or user == null
              return @render json:{stat: '404', error: 'user not found'}
            attrs['userId'] = user.get('id')
            attrs['username'] = user.get('username')
            task.updateAttributes attrs, (error) =>
            if error
              return @render json:{stat: 'fail', error: error}
            return @render json:{stat: 'ok', task: task}
      else
        task.updateAttributes attrs, (error) =>
          if error
            return @render json:{stat: 'fail', error: error}
          @render json:{stat: 'ok', task: task}