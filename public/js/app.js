define([
/** angular library **/
    'angular',
/** main features **/
    'features/dashboard/feature',
    'features/auth/feature'
], function (angular) {

    'use strict';

    var app = angular.module('ApplicationModule', [
        'ui.router',
        'dashboard.feature',
        'auth.feature'
    ]);
    return app;
});