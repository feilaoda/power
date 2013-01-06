class App.ProjectsController extends App.ApplicationController
  @param 'title'

  @scope 'all'

  Step = require('step')

  @beforeAction 'setContentType' #, only: ['show', 'index', 'create', 'destroy']
  setContentType: ->
    @headers['Content-Type'] = "application/json; charset=UTF-8"

  # loadProject: ->
  #   App.Project.find @params.id, (error, project) =>
  #     if error or project == null
  #       return @render json:{stat: 'fail', error: '404'}
  #     @project = project

  index: ->
    App.Project.all (error, projects) =>
      if error
        @render json:{stat: 'fail'}
      else
        @render json:{stat: 'ok', projects:projects}
        


  create: ->
    console.log(@params)
    @project = App.Project.build(title: @params.title)

    @project.save (error) =>
      if error
        return @render json:{stat: 'fail'}
      else
        return @render json:{stat: 'ok', project: @project}
        
  destroy: ->
    App.Project.find @params.id, (error, project) =>
      if error or project == null
        return @render json:{stat: 'fail'}
      App.Tasklist.where(projectId: @params.id).destroy (error) =>
        console.log("destroy tasklist", error)
      App.Task.where(projectId: @params.id).destroy (error) =>
        console.log("destroy task", error)
      project.destroy (error) =>
        if error
          @render json:{stat: 'fail', error: error}
        else
          @render json:{stat: 'ok', project: project}

  member: ->
    App.Project.find @params.id, (error, project) =>
      if error or project == null
        return @render json:{stat: '404', error: 'project not found'}
      @project = project
      App.Member.where(projectId:@params.id).all  (error, members) =>
        if error
          return @render json:{stat: 'fail', error: error}
        return @render json:{stat: 'ok', project: @project, members: members}

  show: ->
    _this = this
    projectId = @params.id
    tasklists = {}
  
    App.Project.find @params.id, (err, project) =>
      if err or project == null
        return @render json:{stat: '404', error: 'project not found'}
      else
        @project = project
      if @params.single == 'true'
        return @render json:{stat: 'ok', project: project}

      Step(
        ->
          App.Tasklist.where(projectId: projectId).all this
          return
        (err, tls)->
          if err
            return []
          # console.log("tasklist count is: ", tls.length)
          parallel = this.parallel
          if tls.length>0 
            for tasklist in tls
              tasklistId = tasklist.get('id')
              # console.log(tasklist.get('title'), tasklistId)
              tasklists[tasklistId] = tasklist.toJSON()
              App.Task.where(tasklistId: tasklistId, status: 'todo').all   parallel()
            return
          else
            return []
        (err)->
          # console.log("arguments: ", Array.prototype.slice.call(arguments,1))
          
          for data in Array.prototype.slice.call(arguments,1)
            # console.log("task tasklistId: ", data[0].get('tasklistId'), tasklists)
            if data != undefined and data.length > 0
              tasklistId = data[0].get('tasklistId')
              if tasklistId != undefined
                tasks = []
                for tl in data
                  tasks.push(tl.toJSON())
                if tasks.length > 0
                  tasklists[tasklistId]['tasks'] = tasks

          
          json_data = {project: {id: projectId}, tasklists: tasklists}        
          
          _this.render json: {stat: 'ok', project: _this.project, tasklists: tasklists}  , status: 200
      )
    
    return


  update: ->
    App.Project.find @params.id, (error, project) =>
      if error or project == null
        return @render json:{stat: '404', error: 'project not found'}
      attrs = {}

      if @params.title != undefined
        attrs['title'] = @params.title
      project.updateAttributes attrs, (error) =>
        if error
          return @render json:{stat: 'fail', error: error}
        @render json:{stat: 'ok'}
