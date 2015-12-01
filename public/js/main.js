var app = angular.module("main",["ngRoute","main.home","main.graph"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    redirectTo: "/home"
  })
  .otherwise({
    redirectTo: "/home"
  })
}]);

app.directive("chart",function($window) {
  return {
    restrict: "EA",
    template: "<svg id='chart-save' height='500'></svg>",
    link: function(scope, elem, attrs) {
      var data = scope[attrs.chartData];
      if(attrs.sort == "true") {
        data.sort(function(a, b) {
          return a.value - b.value;
        })
      }

      var xLabel = attrs.xlabel;
      var yLabel = attrs.ylabel;

      var pathClass = "path";
      var d3 = $window.d3;
      var rawSvg = elem.find("svg")[0];
      var svg = d3.select(rawSvg);

      var chartData = {
        width: 1000,
        height: 500
      };

    var margin = {top: 40, right: 40, bottom: 40, left: 100},
    width = parseInt(rawSvg.parentElement.clientWidth, 10),
    width = width - margin.left - margin.right;

    var height = chartData.height - margin.top - margin.bottom;

    var x = d3.scale.linear()
      .domain([0,d3.max(data, function(d) {
        return d.value;
      })])
      .range([0,width]);

    var y = d3.scale.ordinal()
  		.domain(data.map(function(entry){
  			return entry.key;
  		}))
  		.rangeBands([0, height]);

    var ordinalColorScale = d3.scale.category20();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var yGridlines = d3.svg.axis()
      .scale(x)
      .tickSize(-height,0,0)
      .tickFormat("")
      .orient("top");

    var chart = svg.append("g")
      .classed("display", true)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var plot = function(params) {
      this.append("g")
        .call(params.gridlines)
  		  .classed("gridline", true)
  		  .attr("transform","translate(0,0)");

      this.selectAll(".bar")
        .data(params.data)
        .enter()
  			.append("rect")
  			.classed("bar", true)
  			.attr("x",0)
  			.attr("y", function(d,i) {
  				return y(d.key);
  			})
  			.attr("width", function(d,i) {
  				return x(d.value);
  			})
  			.attr("height", function(d,i) {
  				return y.rangeBand() - 1;
  			})
  			.style("fill", function(d,i) {
  				return ordinalColorScale(i);
  			});

  		this.selectAll(".bar-label")
  			.data(params.data)
  			.enter()
  			.append("text", true)
  			.classed("bar-label", true)
  			.attr("x", function(d,i) {
  				return x(d.value);
  			})
  			.attr("dx", -4)
  			.attr("y", function(d,i) {
  				return y(d.key);
  			})
  			.attr("dy", function(d,i) {
  				return y.rangeBand()/1.5 -2;
  			})
  			.text(function(d,i) {
  				return d.value;
  			});

  		this.append("g")
  			.classed("x axis",true)
  			.attr("transform","translate("+ 0 +"," + (height) +")")
  			.call(params.axis.x);

  		this.append("g")
  			.classed("y axis",true)
  			.attr("transform","translate("+ 0 +"," + 0 +")")
  			.call(params.axis.y);

  		this.select(".y.axis")
  			.append("text")
  			.attr("x",0)
  			.attr("y",0)
  			.style("text-anchor","middle")
  			.attr("transform","translate(" + (-margin.left + 15 )+","+ height / 2 +") rotate(-90)")
  			.text(yLabel);
      };

      plot.call(chart, {
        data: data,
        axis: {
          x: xAxis,
          y: yAxis
        },
        gridlines: yGridlines
      });

      scope.resize = function(width) {
        rawSvg.style.width= width;
        width = width - margin.left - margin.right - 20;
        var x = d3.scale.linear()
          .domain([0,d3.max(data, function(d) {
            return d.value;
          })])
          .range([0,width]);

        var y = d3.scale.ordinal()
          .domain(data.map(function(entry){
            return entry.key;
        	}))
        	.rangeBands([0, height]);

        var xAxis = d3.svg.axis()
          .scale(x)
        	.orient("bottom");

        var yAxis = d3.svg.axis()
        	.scale(y)
        	.orient("left");

        var yGridlines = d3.svg.axis()
          .scale(x)
        	.tickSize(-height,0,0)
        	.tickFormat("")
        	.orient("top");

        d3.selectAll(".tick").remove();
        d3.selectAll(".bar").remove();
        d3.selectAll(".gridline").remove();
        d3.selectAll(".bar-label").remove();
        d3.selectAll(".x.axis").remove();
        d3.selectAll(".y.axis").remove();

        plot.call(chart, {
          data: data,
          axis: {
            x: xAxis,
            y: yAxis
          },
          gridlines: yGridlines
        });

        d3.selectAll(".bar")
      	.attr("x",0)
      	.attr("y", function(d,i) {
      			return y(d.key);
      	})
      	.attr("width", function(d,i) {
      		return x(d.value);
      	})
        .attr("height", function(d,i) {
          return y.rangeBand() - 1;
        });

        d3.selectAll(".bar-label")
          .attr("x", function(d,i) {
            return x(d.value);
          })
          .attr("dx", -4)
          .attr("y", function(d,i) {
            return y(d.key);
          })
          .attr("dy", function(d,i) {
            return y.rangeBand()/1.5 -2;
          });
        d3.select(".x.axis")
        .append("text")
        .attr("x", 0)
        .attr("y",0)
        .style("text-anchor","middle")
        .attr("transform","translate("+ (width / 2 )+", " + (margin.bottom - 5) +")")
        .text(xLabel);
      }

      angular.element($window).bind('resize', function() {
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);
        var width = rawSvg.parentElement.clientWidth
        scope.resize(width);
        scope.$apply();
      });

      var width = rawSvg.parentElement.clientWidth - 20;
      scope.resize(width);

      attrs.$observe("sort", function(change) {
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);
        var width = rawSvg.parentElement.clientWidth - 20;
        var old = null;
        if(change == "true") {
          old = data;
          data = data.slice().sort(function(a, b) {
            return b.value - a.value;
          });
        } else {
          if(old) {
            data = old;
          } else {
            data = scope[attrs.chartData];
          }
        }
        scope.resize(width);
      });

      attrs.$observe("xlabel", function(change) {
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);
        var width = rawSvg.parentElement.clientWidth - 20;
        xLabel = change;
        scope.resize(width);
      });

      attrs.$observe("ylabel", function(change) {
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);
        var width = rawSvg.parentElement.clientWidth - 20;
        yLabel = change;
        scope.resize(width);
      });

      scope.$watch(attrs.chartData, function(newValue, oldValue) {
        if (newValue) {
          old = oldValue;
          var rawSvg = elem.find("svg")[0];
          var svg = d3.select(rawSvg);
          var width = rawSvg.parentElement.clientWidth - 20;
          scope.resize(width);
        }
      }, true);

    }
  }
});
