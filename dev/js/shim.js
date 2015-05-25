var basePath = '../lib/';

var fromBase = function(url)
{
    return basePath + url;
};

require.config({
    urlArgs: "bump=6ba9294b",
    paths: {
        'angular'   : fromBase('angular/angular.min'),
        'uiRouter'  : fromBase('angular-ui-router/release/angular-ui-router.min'),
        'uiBootstrap' : fromBase('angular-bootstrap/ui-bootstrap-tpls.min'),
        'restangular' : fromBase('restangular/dist/restangular.min'),
        'lodash' : fromBase('lodash/lodash.min'),
        'ngSanitize' : fromBase('angular-sanitize/angular-sanitize.min'),
        'uiSelect' : fromBase('angular-ui-select/dist/select.min')
    },

    shim: {
        angular: {
            exports: 'angular'
        },
        'uiRouter' : {
            deps: ['angular'],
            exports: 'uiRouter'
        },
        uiBootstrap : {
            deps : ['angular'],
            exports : 'uiBootstrap'
        },
        restangular : {
            deps : ['angular','lodash'],
            exports : 'restangular'
        },
        lodash : {
            deps : [],
            exports : 'lodash'
        },
        ngSanitize : {
            deps : ['angular'],
            exports : 'ngSanitize'
        },
        uiSelect : {
            deps : ['angular'],
            exports : 'uiSelect'
        }
    },

    baseUrl: 'js'
});

//shimer2

require(['bootstrap','uiRouter','uiBootstrap','restangular', 'ngSanitize','uiSelect'], function (app) {
    app.init();
});