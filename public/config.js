// TODO: complete this config file
angular.module('lost-cities-dashboard', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/view/dashboard/main",
            controller: "DashboardCtrl as dashboard"
        })
        .when("/sub", {
            templateUrl: "/view/dashboard/sub",
            controller: "DashboardCtrl as dashboard"
        })
});

angular.module('lost-cities-game', []);

angular.module('lost-cities-profile', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/view/profile',
            controller: 'ProfileCtrl as profile'
        });
});