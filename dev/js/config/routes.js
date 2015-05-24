define(['../app'], function(app) {
    'use strict';

    app.config(['$locationProvider', function ($location) {
        $location.hashPrefix('!');
        /*$location.html5Mode({
            enabled: true,
            requireBase: false
        });*/
    }]);


    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

        console.info('Initializing application routes ');
        $urlRouterProvider.otherwise("/auth");

        $stateProvider
            .state('parent',{
                abstract : true,
                views : {
                    '' : {
                        templateUrl : 'js/features/global/views/Layout.html'
                    },
                    'header@parent' : {
                        templateUrl : 'js/features/global/views/Header.html'
                    },
                    'footer@parent' : {
                        templateUrl : 'js/features/global/views/Footer.html'
                    }

                }
            });
    }]);
});