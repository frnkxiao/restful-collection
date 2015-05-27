'use strict';

angular.module('myApp.viewRandomUser', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view-random-user', {
    templateUrl: 'view-random-user/view-random-user.html',
    controller: 'ViewRandomUserCtrl'
  });
}])
.factory('RandomUserDataSource', ['$http', '$q', function($http, $q){
    var sourceUrl = "http://api.randomuser.me/";

    var result = {};
    result.getUser = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: sourceUrl
        }).success(function(data){
            deferred.resolve(data.results[0].user);
        }).error(function(){
            deferred.reject('Error access remote Random User data source.');
        });

        return deferred.promise;
    }

    return result;
}])
.controller('ViewRandomUserCtrl', ['$scope', 'RandomUserDataSource', function($scope, RandomUserDataSource) {
    $scope.user = {}

    var updateUser = function(){
        RandomUserDataSource.getUser()
        .then(function(data) {
            data.name.first = toTitleCase(data.name.first);
            data.name.last = toTitleCase(data.name.last);
            $scope.user = data;
        }, function(error) {
            alert(error);
        });
    };

    updateUser();
    
    $scope.updateUser = function() {
        updateUser();
    }

   function toTitleCase(string) {   
        // \u00C0-\u00ff for a happy Latin-1
        return string.toLowerCase().replace(/_/g, ' ').replace(/\b([a-z\u00C0-\u00ff])/g, function (_, initial) {
            return initial.toUpperCase();
        }).replace(/(\s(?:de|a|o|e|da|do|em|ou|[\u00C0-\u00ff]))\b/ig, function (_, match) {
            return match.toLowerCase();
        });
   } 
}]);
