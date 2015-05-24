define([
    'angular',
    './controllers/config/index',
    './routes/config/index'

], function (ng) {

    return  ng.module('dashboard.feature', [
        'dashboard.controllers',
        'dashboard.routes'
    ]);
});