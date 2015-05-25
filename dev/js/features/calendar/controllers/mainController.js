define(['./config/module'], function (module) {
    'use strict';

    module.controller('calendar/main', ['$scope','$state','Restangular','$modal','$stateParams', function ($scope, $state, Restangular, $modal, $stateParams) {

        /** scope manipulation here **/
        console.info('Controller calendar/main loaded');



        this.data = {};
        this.leasing = {};
        var _parent = this;
        this.refresh = function()
        {
            Restangular.one('calendar',$stateParams.id).get().then(function(data)
            {
                _parent.calendar = data;
            });

        };


        Restangular.one('leasings',$stateParams.id).get().then(function(data){
           _parent.leasing = data;
        });

        this.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        this.openCal = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        this.delete = function(splatka)
        {
            if(confirm('Naozaj chete zmazať túto splátku?')) {
                Restangular.one('leasings', $stateParams.id).one('splatka', splatka.repaymentId).remove().then(function () {
                    _parent.refresh();
                })
            }
        };
        this.save = function()
        {
            Restangular.all('leasings/' + $stateParams.id+'/splatka').customPOST(_parent.data).then(function(data)
            {
                _parent.refresh();
                _parent.data = {};
            });

        };

        this.total = function(car)
        {
          return Number(car.istina) + Number(car.istina * 0.2) + Number(car.financnaCinnost) + Number(car.financnaCinnost * 0.2);
        };
        this.refresh();
        this.open = function (size) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'AddCalendarCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                _parent.refresh();
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);
    module.controller('AddCalendarCtrl', function ($scope, $modalInstance, Restangular) {


        $scope.cars = [];
        $scope.data = {};
        Restangular.all('cars/empty').getList().then(function(data)
        {
            $scope.cars = data;
        });

        $scope.ok = function () {
            Restangular.all('calendar').customPOST($scope.data).then(function()
            {
                $modalInstance.close();
            });

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
});