define([
    'angular',
    './controllers/config/index',
    './routes/config/index'

], function (ng) {

    return  ng.module('auth.feature', [
        'auth.controllers',
        'auth.routes'
    ]);
});