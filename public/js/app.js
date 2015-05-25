define([
/** angular library **/
    'angular',
/** main features **/
    'features/dashboard/feature',
    'features/auth/feature',
    'features/cars/feature',
    'features/leasings/feature',
    'features/calendar/feature'
], function (angular) {

    'use strict';

    var app = angular.module('ApplicationModule', [
        'ui.router',
        'ui.bootstrap',
        'restangular',
        'ngSanitize',
        'ui.select',
        'dashboard.feature',
        'auth.feature',
        'cars.feature',
        'leasings.feature',
        'calendar.feature'
    ]);
    return app;
});