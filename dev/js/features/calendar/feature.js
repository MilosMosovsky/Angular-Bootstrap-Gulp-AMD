define([
    'angular',
    './controllers/config/index',
    './routes/config/index'

], function (ng) {

    return  ng.module('calendar.feature', [
        'calendar.controllers',
        'calendar.routes'
    ]);
});