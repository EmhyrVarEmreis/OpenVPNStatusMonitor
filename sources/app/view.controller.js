(function () {
    'use strict';

    angular.module('openVPNStatusMonitor').controller('ViewController', function ($scope, $timeout, $resource, $filter, NgTableParams) {

        $scope.autoReload = false;
        $scope.data = [];

        $scope.reloadData = function () {
            $resource('/api/?json=true').query().$promise.then(function (data) {
                $scope.data = data;
                for (var i = 0; i < $scope.data.length; i++) {
                    $scope.data[i].bytesSentFormatted = $filter('bytes')($scope.data[i].bytesSent);
                    $scope.data[i].bytesReceivedFormatted = $filter('bytes')($scope.data[i].bytesReceived);
                }
                $scope.tableParams = new NgTableParams({
                    sorting: {
                        name: 'asc'
                    },
                    count: $scope.data.length
                }, {
                    counts: [],
                    dataset: $scope.data
                });
            });
        };

        $scope.autoReloadWorker = function () {
            $timeout(function () {
                if ($scope.autoReload) {
                    $scope.reloadData();
                }
                $scope.autoReloadWorker();
            }, $scope.autoReload ? 3000 : 250);
        };

        $scope.toggleAutoReload = function () {
            $scope.autoReload = !$scope.autoReload;
        };

        $scope.reloadData();
        $scope.autoReloadWorker();

    });

})();
