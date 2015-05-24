define(['./config/module'], function (module) {
    'use strict';

    module.config(['$stateProvider',function($stateProvider) {

        $stateProvider
            .state('dashboard',{
                parent : 'parent',
                url : "/dashboard",
                views : {
                    'content@parent' : {
                        templateUrl : 'js/features/dashboard/views/Dashboard.html',
                        controller : 'dashboard/main'
                    }
                }
            })
    }]);
});