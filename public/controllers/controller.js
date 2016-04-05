var myApp = angular.module('wingwatch', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    //console.log("Hello World from controller");


	var refresh = function () {
	  $http.get('/myFlights')
	  .success(function(res) {
	  $scope.myFlights = res;
	  $scope.flight = "";
	  });
	};

	refresh();

	$scope.addFlight = function () {
		console.log('add flight button clicked', $scope.flight)
		console.log('add flight button clicked', $scope.flight.departure)
		console.log('add flight button clicked', $scope.flight.arrival)
		console.log('add flight button clicked', $scope.flight.date)

		var FlightRequest = {
		      "request": {
		        "slice": [
		          {
		            "origin": $scope.flight.departure,
		            "destination": $scope.flight.arrival,
		            "date": $scope.flight.date
		          }
		        ],
		        "passengers": {
		          "adultCount": 1,
		          "infantInLapCount": 0,
		          "infantInSeatCount": 0,
		          "childCount": 0,
		          "seniorCount": 0
		        },
		        "solutions": 20,
		        "refundable": false
		      }
		 };

		 $http({
		 	method: 'POST',
		  url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDXJhgkBvhEPy7e2lVrnjziqf3KFbQ2jHs",
		  contentType: 'application/json',
		  dataType: 'json',
		  data: JSON.stringify(FlightRequest)
		 }).then(function successCallback(response) {
		     console.log('SUCCESS!', response)
		     var flightPrice = response.data.trips.tripOption[0].saleTotal.slice(3)
		     //console.log(flightPrice);
		     $scope.flight.price = flightPrice
		   }, function errorCallback(response) {
		   	console.log('flight request', FlightRequest)
		    console.log('YOU FAAAAAAAIL!', response);
		   }).then(function(){
		   	 $http.post('/myFlights', $scope.flight)
				 refresh();
		   })


			

		}

		$scope.remove = function(id) {
			console.log('remove button clicked', id)
			$http.delete('/myFlights/'+ id)
		}

}]);