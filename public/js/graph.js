var app = angular.module("main.graph",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/graph", {
    templateUrl: "/views/templates/graph.tpl.html",
    controller: "graphController"
  })
}]);

app.controller("graphController", ["$scope", "$timeout", function($scope,$timeout) {
  $scope.$on('$viewContentLoaded', () => {
    $timeout(() => {
      componentHandler.upgradeAllRegistered();
    })
  });
}])
