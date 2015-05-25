define(['./config/module'], function (module) {
    'use strict';

    module.controller('cars/main', ['$scope','$state','Restangular','$modal', function ($scope, $state, Restangular, $modal) {

        /** scope manipulation here **/
        console.info('Controller cars/main loaded');

        var _parent = this;

        this.refresh = function()
        {
            Restangular.all('cars').getList().then(function(data)
            {
                _parent.cars = data;
            });
        };

        this.refresh();


        this.items = ['item1', 'item2', 'item3'];

        this.open = function (size) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return _parent.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                _parent.refresh();
            }, function () {
                console.info('Modal dismissed at: ' + new Date());
            });
        };

        this.delete = function(id)
        {
            if(confirm('Naozaj chcete zmazať toto auto?'))
            {
                Restangular.one('cars',id).remove().then(function()
                {
                    _parent.refresh();
                })
            }
        }
    }]);

    module.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items,Restangular) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            Restangular.all('cars').customPOST($scope.data).then(function()
            {

                $modalInstance.close($scope.selected.item);
            });

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
});