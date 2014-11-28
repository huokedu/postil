'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: '/tpls/view2',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);