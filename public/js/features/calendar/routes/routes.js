define(['./config/module'], function (module) {
    'use strict';

    module.config(['$stateProvider',function($stateProvider) {

        $stateProvider
            .state('calendar',{
                parent : 'parent',
                url : "/calendar/:id",
                views : {
                    'content@parent' : {
                        templateUrl : 'js/features/calendar/views/Calendar.html',
                        controller : 'calendar/main',
                        controllerAs : 'ctrl'
                    }
                }
            })
    }]);
});