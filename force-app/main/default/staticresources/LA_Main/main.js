const MainController = ['$scope', '$http','$sce', '$route', '$location', '$timeout', '$routeParams', ($scope, $http, $sce, $route, $location, $timeout, $routeParams)=>{
    $scope.TEMPLATES = window.resource.TEMPLATES
    $scope.CSS = window.resource.CSS
    
    $scope.config = {
        show:{
            modal: false
        },
        loading:{
            productList: false,
            setOrder: false,
        }
    }

    $scope.formatPrice = formatPrice;

    $scope.data = {
        search: null,
        cart: {
            productList:[]
        },
        account: null,
        accountList:[],
        productList:[]
    }

    $scope.getCartQuantity = () =>{
        let result = 0;
        if($scope.data.cart.productList.length <= 0) return 0

        result = $scope.data.cart.productList.reduce((a={qtd:0}, b={qtd:0})=>{
            return {qtd: a.qtd + b.qtd}
        }).qtd

        return result
    }

    $scope.getCartPrice = () =>{
        let result = 0;
        if($scope.data.cart.productList.length == 0){
            return 0
        }
        
        else if($scope.data.cart.productList.length == 1){
            result = $scope.data.cart.productList[0].qtd * $scope.data.cart.productList[0].price
            
            return result
        }
        else{
            result = $scope.data.cart.productList.reduce((a={price:0, qtd}, b={price:0, qtd})=>{
                return {price: (a.price * a.qtd) + (b.price * b.qtd), qtd: 1}
            }).price
    
            return result
        }
    }


    $scope.setShowModal = ()=>{
        $scope.config.show.modal = true
    }
    $scope.setHideModal = ()=>{
        $scope.config.show.modal = false
    }

    $scope.setSelectedAccount = (account)=>{
        if(!account) account = $scope.data.accountList[0]
        $scope.data.account = account
        $scope.setHideModal()
    }

    $scope.getMenuActivated = (item)=>{
        let itemActivated = $scope.config.show.modal ? 'contas' : 'home'
        return item === itemActivated
    }

    $scope.addProductQuantity = (product, qtd = 1)=>{
        product.qtd += qtd
    }
    $scope.removeProductQuantity = (product, qtd = 1)=>{
        if(product.qtd - qtd < 1) qtd = 0
        product.qtd -= qtd
    }

    $scope.addProductToCart = (product)=>{
        let productInCart = $scope.data.cart.productList.find(p => p.id == product.id)
        if(productInCart){
            productInCart.qtd += product.qtd
        }else{
            $scope.data.cart.productList.push({...product})
        }
        product.qtd = 1
    }

    $scope.init = ()=>{
        $scope.data.accountList = accountList;
        $scope.setSelectedAccount()
    }
}]