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
            orderList: false,
            orderDetails: false
        },
        activeMenu: false
    }

    $scope.data = {
        search: null,
        midSearch: null,
        cart: {
            productList:[]
        },
        account: null,
        accountList:[],
        productList:[],
        order:{
            orderList: [],
            accountsWithOrder: [],
            orderFilter: null,
            orderDetails: null
        }        
    }

    $scope.formatPrice = formatPrice;

    $scope.formatDate = (date, options)=>{
        return new Date(date).toLocaleString('pt-BR', {...options, timeZone: 'UTC'});
    }


    $scope.setSearch = ()=>{
        $scope.data.search = $scope.data.midSearch
        $scope.data.midSearch = null
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

    $scope.executeCallbacks = (...arguments) => {
        arguments.forEach(f => f)
    }
    $scope.setMenuActivated = (item) =>{
        $scope.config.activeMenu = item
    }
    $scope.getMenuActivated = (item)=>{
        return $scope.config.activeMenu === item
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
    
    $scope.stringToInt = (string)=>{
        try {
            return parseInt(string)
        } catch (error) {
            return string
        }
    }

    function getInitialMenuState(){
        let path = $location.path()
        switch(path){
            case '/':
                $scope.config.activeMenu = 'home'
                break;
            case '/pedidos':
                $scope.config.activeMenu = 'pedidos'
                break;
            default:
                $scope.config.activeMenu = null
        }
    }

    $scope.$on('$locationChangeSuccess', function($event, next, current) { 
        getInitialMenuState()
      });


    $scope.init = ()=>{
        $scope.data.accountList = accountList;
        $scope.setSelectedAccount()
    }
}]