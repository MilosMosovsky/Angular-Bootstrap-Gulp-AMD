define(['../app'], function(app) {
    'use strict';

    app.constant('gitConstant',{
        version : '6ba9294b'
    });

    app.run(['gitConstant', function(gitUtils){
        console.info('Application sucessfully started with git version of ['+ gitUtils.version +']');
    }]);

    app.config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://api-crm.cryptonite.sk');
    }]);
});