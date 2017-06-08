(function () {
    'use strict';
    
    angular.module('openVPNStatusMonitor', [
        'ui.router',
        'ngResource',
        'ngTable'
    ]);

    angular.module('openVPNStatusMonitor')
        .config(['$stateProvider', '$urlRouterProvider',

            function stateConfig($stateProvider, $urlRouterProvider) {

                $stateProvider
                    .state('view', {
                        url:          '/view',
                        templateUrl:  '/view.html',
                        controller:   'ViewController',
                        controllerAs: 'vm'
                    });

                $urlRouterProvider.otherwise('/view');

            }]
        );

})();
