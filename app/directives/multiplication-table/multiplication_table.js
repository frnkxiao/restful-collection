'use strict';

angular.module('myApp.directives.multiplicationTable', [])
.controller('multiplicationTableCtrl', ['$scope', function($scope) {
    var x = $scope.x || 0;
    $scope.xrange = new Array(x);
    $scope.getyrange = function(n) {
        return new Array(n);
    }
}])
.directive('multiplicationTable', [function() {
    return {
        templateUrl: 'directives/multiplication-table/multiplication-table-tpl.html',
        scope : {
            x: '='
        },
        controller: 'multiplicationTableCtrl'
    }
}]);


