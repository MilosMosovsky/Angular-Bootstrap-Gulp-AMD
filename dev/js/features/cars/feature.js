define([
    'angular',
    './controllers/config/index',
    './routes/config/index'

], function (ng) {

    return  ng.module('cars.feature', [
        'cars.controllers',
        'cars.routes'
    ]);
});