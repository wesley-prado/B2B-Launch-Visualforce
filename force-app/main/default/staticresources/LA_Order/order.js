const OrderController = ['$scope', '$http','$sce', '$route', '$location', '$timeout', '$routeParams', function($scope, $http, $sce, $route, $location, $timeout, $routeParams){

    $scope.getOrders = async ()=>{
        return await new Promise(resolve =>{
            try {
                callRemoteAction('LA_Controller.getOrders',null,(result,event)=>{
                    resolve({
                        result,
                        event
                    })
                })
            } catch (e) {
                console.error('error', error),
                Swal.fire({
                    type: 'warning',
                    title: 'Ooops',
                    html: '[1] Ocorreu um erro, tente novamente mais tarde...'
                })
                return error
            }
        })
    }

    $scope.handle_getOrders = async ()=>{
        try {
            let {result, event} = await $scope.getOrders()
            if(event && result){
                $scope.data.orderList = result;
                $scope.$apply()
            }
        } catch (e) {
            console.error('error', e)
            Swal.fire({
                type: 'warning',
                title: 'Ooops',
                html: '[2] Ocorreu um erro, tente novamente mais tarde...'
            })
        }    
    }

    $scope.init = ()=>{
        $scope.handle_getOrders()
    }
}]