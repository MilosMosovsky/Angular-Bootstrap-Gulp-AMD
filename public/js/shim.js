var basePath = '../lib/';

var fromBase = function(url)
{
    return basePath + url;
};

require.config({
    urlArgs: "bump=36dfd7d2",
    paths: {
        'angular'   : fromBase('angular/angular.min'),
        'uiRouter'  : fromBase('angular-ui-router/release/angular-ui-router.min'),
        'uiBootstrap' : fromBase('angular-bootstrap/ui-bootstrap-tpls.min')
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
        }
    },

    baseUrl: 'js'
});

//shimer2

require(['bootstrap','uiRouter','uiBootstrap'], function (app) {
    app.init();
});