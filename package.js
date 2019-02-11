Package.describe({
    name: 'malibun23:patches',
    version: '0.0.1',
    summary: '',
    git: '',
    documentation: null
});
Npm.depends({

});
Package.onUse(function(api) {
    api.use('mongo');
    api.use('underscore@1.0.9');
    api.addFiles('shared_users.js','server');
});
