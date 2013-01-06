class App.MembersController extends App.ApplicationController

  @scope 'all'

  index: ->
    App.Member.find  @params.id  (error, member)=>
      if error
        return @render json:{stat: 'fail', error: error}
      console.log(member)
      return @render json:{stat: 'ok', project: @project, member: member}

  create: ->
    console.log(@params)
    @member = App.Member.build()

    App.Project.find @params.projectId, (error, project) =>
      if error or project == null
        return @render json:{stat: '404', error: 'project not found'}

      @project = project
      App.User.where(email:@params.email).first (error, user) =>
        if error or user == null
          return @render json:{stat: '404', error: 'user not found'}
        @user = user
        App.Member.where(projectId: @params.projectId, userId: user.get('id')).first (error, member)=>
          if error or member != null
            return @render json:{stat: 'fail', error: 'user already exist'}

          @member.set('projectId', @project.get('id'))
          @member.set('userId', user.get('id'))
          @member.set('email', @params.email)
          @member.set('username', @user.get('username'))
          @member.save (error) =>
            if error
              return @render json:{stat: 'fail'}
            else
              return @render json:{stat: 'ok', member: @member}



  destroy: ->
    console.log(@params)
    App.Member.find @params.id, (error, member) =>
      if error or member == null
        return @render json:{stat: '404', error: 'member  not found'}
      @member = member

      App.Project.find @params.projectId, (error, project) =>
        if error or project == null
          return @render json:{stat: '404', error: 'project  not found'}

        @member.destroy (error) =>
          if error
            return @render json:{stat: 'fail', error: error}
          return @render json:{stat: 'ok'}