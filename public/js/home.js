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
      d3.selectAll(".area").remove();
      d3.selectAll(".point").remove();
      d3.selectAll(".tick").remove();
      d3.selectAll(".x.axis").remove();
      d3.selectAll(".y.axis").remove();
      d3.selectAll(".tooltip").remove();
    })
  });
}])
