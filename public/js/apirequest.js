var app = angular.module("main");

app.service("dataRequests",["$http", function($http) {
  this.getData = function(isSuc,isFail) {
    $http.get("http://localhost:8080/data").then(isSuc,isFail);
  }
}]);
