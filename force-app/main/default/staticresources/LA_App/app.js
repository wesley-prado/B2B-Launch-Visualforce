(function(){
    let laApp = angular.module('laApp', ['ngRoute','ngLocationUpdate'])

    laApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        let resource = window.resource.HTML
        $routeProvider
        .when('/',{
            templateUrl: resource['home'],
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/404'
        })

    }])

    laApp.controller('MainCtrl', MainController)
    laApp.controller('HomeCtrl', HomeController)
})();