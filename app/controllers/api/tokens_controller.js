load('application');

action(function index() {
    res.json({token: req.csrfToken});
});

