const CartController = ['$scope', '$http','$sce', '$route', '$route', '$location', '$timeout', '$routeParams', function(scope, http, $sce, $route, $location, $timeout, $routeParams){
    scope.getProductList = async ()=>{
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

    scope.handle_getProductList = async ()=>{
        scope.config.loading.productList = true;
        try {
            let {result, event} = await scope.getProductList()
            

            if(event && result){
                if(!result.hasError){
                    scope.data.productList = result.data
                }else{
                    console.error('error', error),
                    Swal.fire({
                        type: 'warning',
                        title: 'Ooops',
                        html: result.message
                    })
                }
            }else{
                console.error('error', error),
                Swal.fire({
                    type: 'warning',
                    title: 'Ooops',
                    html: '[4] Ocorreu um erro, tente novamente mais tarde...'
                })
            }
        } catch (error) {
            console.error('error', error),
            Swal.fire({
                type: 'warning',
                title: 'Ooops',
                html: '[3] Ocorreu um erro, tente novamente mais tarde...'
            })
        }
        scope.config.loading.productList = false;
        scope.$apply()
    }

<<<<<<< HEAD
    scope.deleteFromCart = ()=>{

    };
=======
    scope.deleteFromCart(){
        
    }
>>>>>>> bbf7a3742b365b7eb0df8a01fcb3c0dfb4073aed

    scope.init = ()=>{
        // scope.handle_getProductList();
    }
}]