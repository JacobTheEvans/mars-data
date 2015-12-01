var app = angular.module("main.home",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/home", {
    templateUrl: "/views/templates/home.tpl.html",
    controller: "homeController"
  })
}]);

app.controller("homeController", ["$scope", "$timeout", function($scope,$timeout) {
  $scope.$on('$viewContentLoaded', () => {
    $timeout(() => {
      componentHandler.upgradeAllRegistered();
    })
  });
}])
