'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'ang_html';
    var applicationModuleVendorDependencies = ['ui.router', 'ngMaterial'];

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
ApplicationConfiguration.registerModule('bottomSheetDemo1', ['ngMaterial']);

angular
    .module('newApp1')
    .config(routeConfig);


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

angular.module('bottomSheetDemo1')
  .config(function($mdIconProvider) {
    $mdIconProvider
      .icon('share-arrow', 'img/icons/share-arrow.svg', 24)
      .icon('upload', 'img/icons/upload.svg', 24)
      .icon('copy', 'img/icons/copy.svg', 24)
      .icon('print', 'img/icons/print.svg', 24)
      .icon('hangout', 'img/icons/hangout.svg', 24)
      .icon('mail', 'img/icons/mail.svg', 24)
      .icon('message', 'img/icons/message.svg', 24)
      .icon('copy2', 'img/icons/copy2.svg', 24)
      .icon('facebook', 'img/icons/facebook.svg', 24)
      .icon('twitter', 'img/icons/twitter.svg', 24);
  })
  .controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
    $scope.alert = '';

    $scope.showListBottomSheet = function() {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: 'bottom-sheet-list-template.html',
        controller: 'ListBottomSheetCtrl'
      }).then(function(clickedItem) {
        $scope.alert = clickedItem['name'] + ' clicked!';
      }).catch(function(error) {
        // User clicked outside or hit escape
      });
    };

    $scope.showGridBottomSheet = function() {
      $scope.alert = '';
      $mdBottomSheet.show({
        templateUrl: 'bottom-sheet-grid-template.html',
        controller: 'GridBottomSheetCtrl',
        clickOutsideToClose: false
      }).then(function(clickedItem) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(clickedItem['name'] + ' clicked!')
            .position('top right')
            .hideDelay(1500)
        );
      }).catch(function(error) {
        // User clicked outside or hit escape
      });
    };
  })

  .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {

    $scope.items = [
      { name: 'Share', icon: 'share-arrow' },
      { name: 'Upload', icon: 'upload' },
      { name: 'Copy', icon: 'copy' },
      { name: 'Print this page', icon: 'print' },
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  })
  .controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [
      { name: 'Hangout', icon: 'hangout' },
      { name: 'Mail', icon: 'mail' },
      { name: 'Message', icon: 'message' },
      { name: 'Copy', icon: 'copy2' },
      { name: 'Facebook', icon: 'facebook' },
      { name: 'Twitter', icon: 'twitter' },
    ];

    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  })
  .run(function($templateRequest) {

    var urls = [
      'img/icons/share-arrow.svg',
      'img/icons/upload.svg',
      'img/icons/copy.svg',
      'img/icons/print.svg',
      'img/icons/hangout.svg',
      'img/icons/mail.svg',
      'img/icons/message.svg',
      'img/icons/copy2.svg',
      'img/icons/facebook.svg',
      'img/icons/twitter.svg'
    ];

    angular.forEach(urls, function(url) {
      $templateRequest(url);
    });

  });