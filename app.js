angular.module('shortly', [
 'wingwatch.addTrip',
 'wingwatch.myTrips'
])

.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/myTrips', {
      templateUrl: 'app/myTrips/myTrips.html',
      controller: 'MyTripsController'
    })
    .when('/addTrip', {
      templateUrl: 'client/addTrip/addTrip.html',
      controller: 'AddTripController'
    })
    .otherwise({
      redirectTo:'/myTrips'
    });
});