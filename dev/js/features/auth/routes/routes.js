define(['./config/module'], function (module) {
    'use strict';

    module.config(['$stateProvider',function($stateProvider) {

        $stateProvider
            .state('auth',{
                parent : 'parent',
                url : "/auth",
                views : {
                    'content@parent' : {
                        templateUrl : 'js/features/auth/views/Auth.html',
                        controller : 'auth/main'
                    }
                }
            })
    }]);
});