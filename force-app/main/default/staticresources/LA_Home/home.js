const HomeController = ['$scope', '$http','$sce', '$route', '$location', '$timeout', '$routeParams', function($scope, $http, $sce, $route, $location, $timeout, $routeParams){
    $scope.getProductList = async ()=>{
        try {
            return await new Promise((resolve)=>{
                try {
                    callRemoteAction('LA_Controller.getProductList', null, (result, event)=>{
                        resolve({
                            result,
                            event
                        })
                    });
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
        } catch (error) {
            console.error('error', error),
            Swal.fire({
                type: 'warning',
                title: 'Ooops',
                html: '[2] Ocorreu um erro, tente novamente mais tarde...'
            })
            return error
        }
    }

    $scope.handle_getProductList = async ()=>{
        $scope.config.loading.productList = true;
        try {
            let {result, event} = await $scope.getProductList()
            

            if(event && result){
                if(!result.hasError){
                    $scope.data.productList = result.data
                }else{
                    Swal.fire({
                        type: 'warning',
                        title: 'Ooops',
                        html: result.message
                    })
                }
            }else{
                Swal.fire({
                    type: 'warning',
                    title: 'Ooops',
                    html: '[4] Ocorreu um erro, tente novamente mais tarde...'
                })
            }
        } catch (error) {
            Swal.fire({
                type: 'warning',
                title: 'Ooops',
                html: '[3] Ocorreu um erro, tente novamente mais tarde...'
            })
        }
        $scope.config.loading.productList = false;
        $scope.$apply()
    }

    $scope.init = ()=>{
        $scope.handle_getProductList();
    }
}]