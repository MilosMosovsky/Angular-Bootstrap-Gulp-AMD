define(['./config/module'], function (module) {
    'use strict';

    module.controller('auth/main', ['$scope','$state', function ($scope, Restangular, $state) {

        /** scope manipulation here **/
        console.info('Controller auth/main loaded');
    }])
});