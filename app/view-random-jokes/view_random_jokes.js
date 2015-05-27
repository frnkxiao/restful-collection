'use strict';

angular.module('myApp.viewRandomJokes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view-random-jokes', {
    templateUrl: 'view-random-jokes/view-random-jokes.html',
    controller: 'ViewRandomJokesCtrl'
  });
}])
.factory('RandomJokesDataSource', ['$http', '$q', function($http, $q){
    var sourceUrl = "http://api.icndb.com/jokes/random";

    var result = {};
    result.getJokes = function(numOfJokes) {

        numOfJokes = numOfJokes || 1;
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: sourceUrl + "/" + numOfJokes
        }).success(function(data){
            deferred.resolve(data.value);
        }).error(function(){
            deferred.reject('Error access remote Random Jokes data source.');
        });

        return deferred.promise;
    }

    return result;
}])
.controller('ViewRandomJokesCtrl', ['$scope', 'RandomJokesDataSource', function($scope, RandomJokesDataSource) {
    $scope.jokes = []

    var updateJokes = function(){
        RandomJokesDataSource.getJokes(10)
        .then(function(data) {
            $scope.jokes = data;
        }, function(error) {
            alert(error);
        });
    };

    updateJokes();
    
    $scope.updateJokes = function() {
        updateJokes();
    }
}]);
