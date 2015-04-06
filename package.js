Package.describe({
    name: 'risul:busboy',
    summary: 'Meteor package for Node.js busboy module',
    version: '0.0.2',
    git: 'https://github.com/risul/meteor-busboy'
});

Npm.depends({
    'busboy': '0.2.9'
});

Package.onUse(function(api) {
    api.versionsFrom('METEOR@1.0');
    api.export('Busboy');
    api.addFiles('lib/busboy.js', 'server');
});