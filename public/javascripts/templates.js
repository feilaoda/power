
Tower.View.cache = {
  'projects/edit': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Title:</label>\
{{view Ember.TextField valueBinding="title"}}{{#with errors}}          <span class="help-inline error">{{title}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Create time:</label>\
{{view Ember.TextField valueBinding="createTime"}}{{#with errors}}          <span class="help-inline error">{{createTime}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'projects/index': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}<table summary="Table for Projects" role="grid" class="table">\
  <thead>\
    <tr scope="row">\
      <th abbr="title" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Title</span>\
        </a>\
      </th>\
      <th abbr="createTime" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>CreateTime</span>\
        </a>\
      </th>\
    </tr>\
  </thead>\
  <tbody>\
{{#each project in App.projectsController.all}}    <tr class="project" scope="row" role="row">\
      <td role="gridcell">{{project.title}}</td>\
      <td role="gridcell">{{project.createTime}}</td>\
      <td role="gridcell">\
        <a {{action showProject project href=true}}>Show</a>\
        <span>|</span>\
        <a {{action editProject project href=true}}>Edit</a>\
        <span>|</span>\
        <a {{action destroyProject project}}>Destroy</a>\
      </td>\
    </tr>\
{{/each}}  </tbody>\
  <tfoot>\
    <tr scope="row">\
      <td colspan="5" role="gridcell">\
        <a {{action newProject project href=true}}>New Project</a>\
      </td>\
    </tr>\
  </tfoot>\
</table>\
'),
  'projects/new': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Title:</label>\
{{view Ember.TextField valueBinding="title"}}{{#with errors}}          <span class="help-inline error">{{title}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Create time:</label>\
{{view Ember.TextField valueBinding="createTime"}}{{#with errors}}          <span class="help-inline error">{{createTime}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'projects/show': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<dl class="content">\
  <dt>Title:</dt>\
  <dd>{{title}}</dd>\
  <dt>Create time:</dt>\
  <dd>{{createTime}}</dd>\
</dl>\
{{/with}}'),
  'sessions/edit': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Provider:</label>\
{{view Ember.TextField valueBinding="provider"}}{{#with errors}}          <span class="help-inline error">{{provider}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Uid:</label>\
{{view Ember.TextField valueBinding="uid"}}{{#with errors}}          <span class="help-inline error">{{uid}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Username:</label>\
{{view Ember.TextField valueBinding="username"}}{{#with errors}}          <span class="help-inline error">{{username}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'sessions/index': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}<table summary="Table for Sessions" role="grid" class="table">\
  <thead>\
    <tr scope="row">\
      <th abbr="provider" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Provider</span>\
        </a>\
      </th>\
      <th abbr="uid" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Uid</span>\
        </a>\
      </th>\
      <th abbr="username" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Username</span>\
        </a>\
      </th>\
    </tr>\
  </thead>\
  <tbody>\
{{#each session in App.sessionsController.all}}    <tr class="session" scope="row" role="row">\
      <td role="gridcell">{{session.provider}}</td>\
      <td role="gridcell">{{session.uid}}</td>\
      <td role="gridcell">{{session.username}}</td>\
      <td role="gridcell">\
        <a {{action showSession session href=true}}>Show</a>\
        <span>|</span>\
        <a {{action editSession session href=true}}>Edit</a>\
        <span>|</span>\
        <a {{action destroySession session}}>Destroy</a>\
      </td>\
    </tr>\
{{/each}}  </tbody>\
  <tfoot>\
    <tr scope="row">\
      <td colspan="6" role="gridcell">\
        <a {{action newSession session href=true}}>New Session</a>\
      </td>\
    </tr>\
  </tfoot>\
</table>\
'),
  'sessions/new': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Provider:</label>\
{{view Ember.TextField valueBinding="provider"}}{{#with errors}}          <span class="help-inline error">{{provider}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Uid:</label>\
{{view Ember.TextField valueBinding="uid"}}{{#with errors}}          <span class="help-inline error">{{uid}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Username:</label>\
{{view Ember.TextField valueBinding="username"}}{{#with errors}}          <span class="help-inline error">{{username}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'sessions/show': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<dl class="content">\
  <dt>Provider:</dt>\
  <dd>{{provider}}</dd>\
  <dt>Uid:</dt>\
  <dd>{{uid}}</dd>\
  <dt>Username:</dt>\
  <dd>{{username}}</dd>\
</dl>\
{{/with}}'),
  'tasklists/edit': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Title:</label>\
{{view Ember.TextField valueBinding="title"}}{{#with errors}}          <span class="help-inline error">{{title}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'tasklists/index': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}<table summary="Table for Tasklists" role="grid" class="table">\
  <thead>\
    <tr scope="row">\
      <th abbr="title" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Title</span>\
        </a>\
      </th>\
    </tr>\
  </thead>\
  <tbody>\
{{#each tasklist in App.tasklistsController.all}}    <tr class="tasklist" scope="row" role="row">\
      <td role="gridcell">{{tasklist.title}}</td>\
      <td role="gridcell">\
        <a {{action showTasklist tasklist href=true}}>Show</a>\
        <span>|</span>\
        <a {{action editTasklist tasklist href=true}}>Edit</a>\
        <span>|</span>\
        <a {{action destroyTasklist tasklist}}>Destroy</a>\
      </td>\
    </tr>\
{{/each}}  </tbody>\
  <tfoot>\
    <tr scope="row">\
      <td colspan="4" role="gridcell">\
        <a {{action newTasklist tasklist href=true}}>New Tasklist</a>\
      </td>\
    </tr>\
  </tfoot>\
</table>\
'),
  'tasklists/new': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Title:</label>\
{{view Ember.TextField valueBinding="title"}}{{#with errors}}          <span class="help-inline error">{{title}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'tasklists/show': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<dl class="content">\
  <dt>Title:</dt>\
  <dd>{{title}}</dd>\
</dl>\
{{/with}}'),
  'tasks/edit': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Title:</label>\
{{view Ember.TextField valueBinding="title"}}{{#with errors}}          <span class="help-inline error">{{title}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'tasks/index': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}<table summary="Table for Tasks" role="grid" class="table">\
  <thead>\
    <tr scope="row">\
      <th abbr="title" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Title</span>\
        </a>\
      </th>\
    </tr>\
  </thead>\
  <tbody>\
{{#each task in App.tasksController.all}}    <tr class="task" scope="row" role="row">\
      <td role="gridcell">{{task.title}}</td>\
      <td role="gridcell">\
        <a {{action showTask task href=true}}>Show</a>\
        <span>|</span>\
        <a {{action editTask task href=true}}>Edit</a>\
        <span>|</span>\
        <a {{action destroyTask task}}>Destroy</a>\
      </td>\
    </tr>\
{{/each}}  </tbody>\
  <tfoot>\
    <tr scope="row">\
      <td colspan="4" role="gridcell">\
        <a {{action newTask task href=true}}>New Task</a>\
      </td>\
    </tr>\
  </tfoot>\
</table>\
'),
  'tasks/new': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Title:</label>\
{{view Ember.TextField valueBinding="title"}}{{#with errors}}          <span class="help-inline error">{{title}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'tasks/show': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<dl class="content">\
  <dt>Title:</dt>\
  <dd>{{title}}</dd>\
</dl>\
{{/with}}'),
  'users/edit': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Username:</label>\
{{view Ember.TextField valueBinding="username"}}{{#with errors}}          <span class="help-inline error">{{username}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Email:</label>\
{{view Ember.TextField valueBinding="email"}}{{#with errors}}          <span class="help-inline error">{{email}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Password:</label>\
{{view Ember.TextField valueBinding="password"}}{{#with errors}}          <span class="help-inline error">{{password}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Create time:</label>\
{{view Ember.TextField valueBinding="createTime"}}{{#with errors}}          <span class="help-inline error">{{createTime}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'users/index': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}<table summary="Table for Users" role="grid" class="table">\
  <thead>\
    <tr scope="row">\
      <th abbr="username" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Username</span>\
        </a>\
      </th>\
      <th abbr="email" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Email</span>\
        </a>\
      </th>\
      <th abbr="password" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>Password</span>\
        </a>\
      </th>\
      <th abbr="createTime" role="columnheader" scope="col" class="sortable asc" aria-sort="asc" aria-selected="aria-selected">\
        <a href="?sort=+">\
          <span>CreateTime</span>\
        </a>\
      </th>\
    </tr>\
  </thead>\
  <tbody>\
{{#each user in App.usersController.all}}    <tr class="user" scope="row" role="row">\
      <td role="gridcell">{{user.username}}</td>\
      <td role="gridcell">{{user.email}}</td>\
      <td role="gridcell">{{user.password}}</td>\
      <td role="gridcell">{{user.createTime}}</td>\
      <td role="gridcell">\
        <a {{action showUser user href=true}}>Show</a>\
        <span>|</span>\
        <a {{action editUser user href=true}}>Edit</a>\
        <span>|</span>\
        <a {{action destroyUser user}}>Destroy</a>\
      </td>\
    </tr>\
{{/each}}  </tbody>\
  <tfoot>\
    <tr scope="row">\
      <td colspan="7" role="gridcell">\
        <a {{action newUser user href=true}}>New User</a>\
      </td>\
    </tr>\
  </tfoot>\
</table>\
'),
  'users/new': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<form>\
  <fieldset>\
    <ul class="fields">\
      <li class="control-group">\
        <div class="controls">\
          <label>Username:</label>\
{{view Ember.TextField valueBinding="username"}}{{#with errors}}          <span class="help-inline error">{{username}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Email:</label>\
{{view Ember.TextField valueBinding="email"}}{{#with errors}}          <span class="help-inline error">{{email}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Password:</label>\
{{view Ember.TextField valueBinding="password"}}{{#with errors}}          <span class="help-inline error">{{password}}</span>\
{{/with}}        </div>\
      </li>\
      <li class="control-group">\
        <div class="controls">\
          <label>Create time:</label>\
{{view Ember.TextField valueBinding="createTime"}}{{#with errors}}          <span class="help-inline error">{{createTime}}</span>\
{{/with}}        </div>\
      </li>\
      <li>\
        <a {{action submit target="resource"}}>Submit</a>\
      </li>\
    </ul>\
  </fieldset>\
</form>\
{{/with}}'),
  'users/show': Ember.Handlebars.compile('{{#if getFlash.error}}<div class="alert alert-error">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Error!</h1>\
  <h4>{{getFlash.error}}</h4>\
</div>\
{{/if}}{{#if getFlash.success}}<div class="alert alert-success">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Success!</h1>\
  <h4>{{getFlash.success}}</h4>\
</div>\
{{/if}}{{#if getFlash.info}}<div class="alert alert-info">\
  <a class="close" data-dismiss="alert" href="#">\
    x\
  </a>\
  <h1>Important!</h1>\
  <h4>{{getFlash.info}}</h4>\
</div>\
{{/if}}{{#with resource}}<dl class="content">\
  <dt>Username:</dt>\
  <dd>{{username}}</dd>\
  <dt>Email:</dt>\
  <dd>{{email}}</dd>\
  <dt>Password:</dt>\
  <dd>{{password}}</dd>\
  <dt>Create time:</dt>\
  <dd>{{createTime}}</dd>\
</dl>\
{{/with}}'),
  'welcome': Ember.Handlebars.compile('<h1>Welcome to Tower.js</h1>\
<span>heeeeee</span>\
')
};

_.extend(Ember.TEMPLATES, Tower.View.cache);
