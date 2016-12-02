// TODO: complete this config file
angular.module('lost-cities-dashboard', ["ngRoute"])
.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/view/dashboard-main",
            controller: "DashboardCtrl as dashboard"
        })
});