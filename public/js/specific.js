var app = angular.module("main.specific",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/date/:date", {
    templateUrl: "/views/templates/specific.tpl.html",
    controller: "specificController"
  })
}]);


app.controller("specificController", ["$scope", "$timeout", "dataRequests", "$routeParams", function($scope,$timeout,dataRequests,$routeParams) {
  $scope.date = $routeParams.date;
  $scope.dataToPlot = [
    {"label":"", "text":"", "value":30, "icon": ""},
    {"label":"", "text":"", "value":30, "icon": ""},
    {"label":"", "text":"", "value":30, "icon": ""},
    {"label":"", "text":"", "value":30, "icon": ""}
  ];
  $scope.data = {};
  var date = new Date($scope.date);
  $scope.setData = function(response) {
    for(var i = 0; i < response.data.length; i++) {
      var testDate = new Date(response.data[i].terrestrial_date);
      if(date.getTime() == testDate.getTime()) {
        $scope.data = response.data[i];
        $scope.dataToPlot[0].label = "Max Temperature";
        $scope.dataToPlot[0].sub = $scope.data["max_temp"] + " C, " + $scope.data["max_temp_fahrenheit"] + " F";
        $scope.dataToPlot[0].icon = "fa fa-plus";
        $scope.dataToPlot[1].label = "Min Temperature";
        $scope.dataToPlot[1].sub = $scope.data["min_temp"] + " C, " + $scope.data["min_temp_fahrenheit"] + " F";
        $scope.dataToPlot[1].icon = "fa fa-minus";
        $scope.dataToPlot[2].label = "Pressure";
        $scope.dataToPlot[2].sub = $scope.data["pressure"] + " or " + $scope.data["pressure_string"];
        $scope.dataToPlot[2].icon = "fa fa-arrow-down";
        $scope.dataToPlot[3].label = "Sunrise and Sunset";
        var sunriseDate = new Date($scope.data["sunrise"]);
        var sunsetDate = new Date($scope.data["sunset"])
        $scope.dataToPlot[3].sub = "Rise " + sunriseDate.getUTCHours() + ":" + sunriseDate.getUTCMinutes() + ", " + "Set " + sunsetDate.getUTCHours() + ":" + sunsetDate.getUTCMinutes();
        $scope.dataToPlot[3].icon = "fa fa-sun-o";
      }
    }
  };
  $scope.logError = function(response) {
    console.log("Error", response.status, response.data);
  };
  $scope.$on('$viewContentLoaded', () => {
    $timeout(() => {
      $(".tooltip").hide();
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
