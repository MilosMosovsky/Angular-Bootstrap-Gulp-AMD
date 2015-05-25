define(['./config/module'], function (module) {
    'use strict';

    module.config(['$stateProvider',function($stateProvider) {

        $stateProvider
            .state('leasings',{
                parent : 'parent',
                url : "/leasings",
                views : {
                    'content@parent' : {
                        templateUrl : 'js/features/leasings/views/Leasings.html',
                        controller : 'leasings/main',
                        controllerAs : 'ctrl'
                    }
                }
            })
    }]);
});