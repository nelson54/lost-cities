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

angular.module('lost-cities-profile', ['ngRoute', 'ngResource'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/view/profile/main',
            controller: 'ProfileCtrl as profile'
        })
        .when('/create', {
            templateUrl: '/view/profile/create',
            controller: 'ProfileCtrl as profile'
        })
        .when('/join', {
            templateUrl: '/view/profile/join',
            controller: 'ProfileCtrl as profile'
        });
});