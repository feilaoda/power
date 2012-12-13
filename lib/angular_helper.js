
angular_include_js_tag(jsfile){
    return '<script type="text/javascript" src="/javascripts/'+jsfile+'.js"></script>';
}

HelperSet.prototype.angularJavascriptIncludeTag = function angularJavascriptIncludeTag() {
    if (!paths.js || !paths.javascripts) {
      paths.js = app.settings.jsDirectory || '/javascripts/'
      paths.javascripts = paths.js;
    }
    var args = Array.prototype.slice.call(arguments);
    var options = {type: 'text/javascript'};
    if (typeof args[args.length - 1] == 'object') {
        options = safe_merge(options, args.pop());
    }
    var scripts = [];
    mergeFiles('javascripts', args).forEach(function (file) {
        // there should be an option to change the /javascripts/ folder
        var href = checkFile('js', file);
        delete options.src;
        scripts.push(genericTag('script', '', options, {src: href}));
    });
    return scripts.join('\n    ');
};
HelperSet.prototype.angular_javascript_include_tag = HelperSet.prototype.angularJavascriptIncludeTag;