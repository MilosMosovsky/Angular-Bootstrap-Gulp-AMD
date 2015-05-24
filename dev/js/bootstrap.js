define([
    'angular',
    './config/routes',
    './config/run'
], function (ng) {
    var app =  ng.module('Application', [
        'ApplicationModule'
    ]);

    app.init = function () {
        console.info('Bootstrapping seed application ... ');
        ng.bootstrap(document, ['Application']);
    };

    return app;
});