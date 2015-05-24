define(['./config/module'], function (module) {
    'use strict';

    module.controller('dashboard/main', ['$scope','$state', function ($scope, Restangular, $state) {

        /** scope manipulation here **/
        console.info('Controller dashboard/main loaded');
    }])
});