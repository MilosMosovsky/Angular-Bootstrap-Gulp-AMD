define([
    'angular',
    './controllers/config/index',
    './routes/config/index'

], function (ng) {

    return  ng.module('leasings.feature', [
        'leasings.controllers',
        'leasings.routes'
    ]);
});