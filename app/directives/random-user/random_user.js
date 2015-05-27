'use strict';

angular.module('myApp.directives.randomUser', [])
.controller('randomUserCtrl', ['$scope', function($scope) {
    var x = $scope.x || 0;
    $scope.xrange = new Array(x);
    $scope.getyrange = function(n) {
        return new Array(n);
    }
}])
.directive('randomUser', [function() {
    return {
        templateUrl: 'directives/random-user/random-user-tpl.html',
        scope : {
            x: '='
        },
        controller: 'randomUserCtrl'
    }
}]);


