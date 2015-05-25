define(['./config/module'], function (module) {
    'use strict';

    module.config(['$stateProvider',function($stateProvider) {

        $stateProvider
            .state('cars',{
                parent : 'parent',
                url : "/cars",
                views : {
                    'content@parent' : {
                        templateUrl : 'js/features/cars/views/Cars.html',
                        controller : 'cars/main',
                        controllerAs : 'ctrl'
                    }
                }
            })
    }]);
});