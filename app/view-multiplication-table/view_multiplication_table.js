'use strict';

angular.module('myApp.viewMultiplicationTable', ['myApp.directives.multiplicationTable'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view-multiplication-table', {
    templateUrl: 'view-multiplication-table/view.html',
    controller: 'viewMultiplicationTableCtrl'
  });
}])
.controller('viewMultiplicationTableCtrl', [function(){

}]);


