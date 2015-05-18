define(['../app'], function(app) {
    'use strict';

    app.constant('gitConstant',{
        version : '36dfd7d2'
    });

    app.run(['gitConstant', function(gitUtils){
        console.info('Application sucessfully started with git version of ['+ gitUtils.version +']');
    }]);
});