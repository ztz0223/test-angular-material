'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'ang_html';
    var applicationModuleVendorDependencies = ['ui.router', 'ng-admin'];

    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();

angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular.element(document).ready(function () {
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName])
});

ApplicationConfiguration.registerModule('newApp1', []);

angular
    .module('newApp1')
    .config(routeConfig)
    .config(['NgAdminConfigurationProvider', function (NgAdminConfigurationProvider) {
        // create the admin application
        var admin = NgAdminConfigurationProvider.application('My First Admin')
            .baseApiUrl('/xxx');
        NgAdminConfigurationProvider.configure(admin);
    }]);


routeConfig.$inject = ['$stateProvider'];

function routeConfig($stateProvider) {
    $stateProvider
        .state('order', {
            abstract: true,
            url: '/order',
            template: '<ui-view/>'
        })
        .state('order.admin', {
            url: '',
            template: '<div ui-view="ng-admin">AAAA</div>',
            data: {
            }
        });
}