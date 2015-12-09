var app = angular.module("main.specific",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/date/:date", {
    templateUrl: "/views/templates/specific.tpl.html",
    controller: "specificController"
  })
}]);


app.controller("specificController", ["$scope", "$timeout", "dataRequests", "$routeParams", function($scope,$timeout,dataRequests,$routeParams) {
  $scope.date = $routeParams.date;
  $scope.data = {};
  var date = new Date($scope.date);
  $scope.setData = function(response) {
    for(var i = 0; i < response.data.length; i++) {
      var testDate = new Date(response.data[i].terrestrial_date);
      if(date.getTime() == testDate.getTime()) {
        $scope.data = response.data[i];
      }
    }
  };
  $scope.logError = function(response) {
    console.log("Error", response.status, response.data);
  };
  $scope.$on('$viewContentLoaded', () => {
    $timeout(() => {
      componentHandler.upgradeAllRegistered();
      dataRequests.getData($scope.setData,$scope.logError);
      $(document).mouseup(function (e)
      {
        var container = $(".mdl-layout__drawer");
        var button = $(".mdl-layout__drawer-button");
        if (!container.is(e.target) && container.has(e.target).length === 0 && !button.is(e.target))
        {
          container.removeClass("is-visible");
        }
      });
    })
  });
}]);
