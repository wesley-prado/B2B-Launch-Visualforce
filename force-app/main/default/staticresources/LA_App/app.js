(function(){
    let laApp = angular.module('laApp', ['ngRoute','ngLocationUpdate'])

    laApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        let resource = window.resource.HTML
        $routeProvider
        .when('/',{
            templateUrl: resource['home'],
            controller: 'HomeCtrl'
        })
        .when('/404',{
            templateUrl: resource['404'],
            controller: '404Ctrl'
        })
        .otherwise({
            redirectTo: '/404'
        })

    }])

    laApp.controller('MainCtrl', MainController)
    laApp.controller('HomeCtrl', HomeController)
    laApp.controller('404Ctrl', C404Controller)
})();