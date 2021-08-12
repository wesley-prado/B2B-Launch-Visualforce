const OrderController = ['$scope', '$http','$sce', '$route', '$location', '$timeout', '$routeParams', function($scope, $http, $sce, $route, $location, $timeout, $routeParams){

    $scope.OrderConfig = {
        show:{
            OrderModal: false
        }
    }

    $scope.getOrders = async ()=>{
        return await new Promise(resolve =>{
            try {
                callRemoteAction('LA_Controller.getOrders',null,(result,event)=>{
                    resolve({
                        result,
                        event
                    })
                })
            } catch (error) {
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
        $scope.config.loading.orderList = true
        try {
            let {result, event} = await $scope.getOrders()
            if(event && result){
                $scope.data.order.orderList = result.data;
                getAccountWithOrder(result.data)
            }
        } catch (e) {
            console.error('error', e)
            Swal.fire({
                type: 'warning',
                title: 'Ooops',
                html: '[2] Ocorreu um erro, tente novamente mais tarde...'
            })
        }
        $scope.config.loading.orderList = false
        $scope.$apply()
    }

    function isAccountInserted(accountArray, accountName){
        for(let i = 0; i < accountArray.length; i++){
            if(accountArray[i].accountName === accountName){
               return true
            }
        }
        return false;
    }

    function getAccountWithOrder(result){
        const accountArray = [];

        for(let i = 0; i < result.length; i++){
            if(isAccountInserted(accountArray, result[i].accountName)){
                continue
            }
            accountArray.push({
                accountName: result[i].accountName,
                accountPhone: result[i].accountPhone || 'Telefone não encontrado'
            })

        }
        $scope.data.order.accountsWithOrder = accountArray
    }

    $scope.setOrderFilter = (accountName)=>{
        $scope.data.order.orderFilter = accountName;
        $scope.setHideOrderModal()
    }
    $scope.setShowOrderModal = ()=>{
        $scope.OrderConfig.show.OrderModal = true
    }
    $scope.setHideOrderModal = ()=>{
        $scope.OrderConfig.show.OrderModal = false
    }

    $scope.init = ()=>{
        $scope.handle_getOrders()
    }
}]