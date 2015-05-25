define(['./config/module'], function (module) {
    'use strict';

    module.controller('leasings/main', ['$scope','$state','Restangular','$modal', function ($scope, $state, Restangular, $modal) {

        /** scope manipulation here **/
        console.info('Controller leasings/main loaded');

        var _parent = this;

        this.refresh = function()
        {
            Restangular.all('leasings').getList().then(function(data)
            {
                _parent.leasings = data;
            });

        };

        this.refresh();
        this.open = function (size) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'AddLeaseCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                _parent.refresh();
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);
    module.controller('AddLeaseCtrl', function ($scope, $modalInstance, Restangular) {


        $scope.cars = [];
        $scope.data = {};
        Restangular.all('cars/empty').getList().then(function(data)
        {
            $scope.cars = data;
        });

        $scope.ok = function () {
            Restangular.all('leasings').customPOST($scope.data).then(function()
            {
                $modalInstance.close();
            });

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
});