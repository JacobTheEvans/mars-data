var app = angular.module("main",["ngRoute","main.home","main.graph","main.specific","angularRangeSlider","chartdirs"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    redirectTo: "/home"
  })
  .otherwise({
    redirectTo: "/home"
  })
}]);
