const OrderDetailsController = ['$scope', '$http','$sce', '$route', '$location', '$timeout', '$routeParams', function($scope, $http, $sce, $route, $location, $timeout, $routeParams){
    $scope.getOrderDetails = async (orderNumber)=>{
        return await new Promise(resolve =>{
            try {
                callRemoteAction('LA_Controller.getOrderDetails', orderNumber, (result, event)=>{
                    return resolve({
                        result,
                        event
                    })
                })
            } catch (error) {
                console.error(error)
                Swal.fire({
                    type: 'warning',
                    title: 'Ooops',
                    html: '[1] Ocorreu um erro, tente novamente mais tarde...'
                })
                return error
            }
        })
    }
    $scope.handle_getOrderDetails = async (orderNumber)=>{
        $scope.config.loading.orderDetails = true
        const {result, event} = await $scope.getOrderDetails(orderNumber);

        if(result && event){
            $scope.data.order.orderDetails = {
                ...result.data[0]
            };
        }
        $scope.config.loading.orderDetails = false
        $scope.$apply()
    }

    const getOrderNumberFromPath = ()=>{
        return $location.path().replace('/detalhes/', '') 
    }

    $scope.init = ()=>{
        $scope.handle_getOrderDetails(getOrderNumberFromPath());
    }
}]