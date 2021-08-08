(function(){
    let laApp = angular.module('laApp', ['ngRoute','ngLocationUpdate'])

    laApp.directive('resize', function ($window) {
        return function (scope) {
            scope.width = $window.innerWidth;
            scope.height = $window.innerHeight;
            angular.element($window).bind('resize', function () {
                scope.$apply(function () {
                    scope.width = $window.innerWidth;
                    scope.height = $window.innerHeight;
                });
            });
            };
        });

    laApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        let resource = window.resource.HTML
        $routeProvider
        .when('/',{
            templateUrl: resource['home'],
            controller: 'HomeCtrl'
        })
        .when('/carrinho',{
            templateUrl: resource['cart'],
            controller: 'CartCtrl'
      })
        .when('/pedidos',{
            templateUrl: resource['order'],
            controller: 'OrderCtrl'
      })
        .when('/detalhes/:orderId',{
            templateUrl: resource['orderDetails'],
            controller: 'OrderDetailsCtrl'
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
    laApp.controller('CartCtrl', CartController)
    laApp.controller('404Ctrl', C404Controller)
    laApp.controller('OrderCtrl', OrderController)
    laApp.controller('OrderDetailsCtrl', OrderDetailsController)
})();