const MainController = ['$scope', '$http','$sce', '$route', '$route', '$location', '$timeout', '$routeParams', function(scope, http, $sce, $route, $location, $timeout, $routeParams){
    scope.TEMPLATES = window.resource.TEMPLATES
    
    scope.config = {
        show:{
            modal: false
        }
    }

    scope.formatPrice = formatPrice;

    scope.data = {
        search: null,
        cart: {
            productList:[
            {
                name:'P1',
                qtd: 2,
                price:64.50
            },
            {
                name:'P2',
                qtd: 1,
                price:64.50
            },
            {
                name:'P3',
                qtd: 2,
                price:64.50
            },
        ]
        },
        account: null,
        accountList:[
            {   
                id: 1,
                name: 'Samuel Silva',
                email: 'samuel.silva@nescara.com'
            },
            {   
                id: 2,
                name: 'Christiane Smokovicz',
                email: 'christiane.smokovicz@nescara.com'
            },
            {   
                id: 3,
                name: 'Marcio Rizzatto',
                email: 'marcio.rizzatto@nescara.com'
            },
            {   
                id: 4,
                name: 'Lilian March',
                email: 'lilian.march@nescara.com'
            },
            {   
                id: 5,
                name: 'Rodrigo Morais',
                email: 'rodrigo.morais@nescara.com'
            }
        ]
    }

    scope.getCartQuantity = () =>{
        let result = 0;
        if(scope.data.cart.productList.length <= 0) return 0

        result = scope.data.cart.productList.reduce((a={qtd:0}, b={qtd:0})=>{
            return {qtd: a.qtd + b.qtd}
        }).qtd

        return result
    }

    scope.getCartPrice = () =>{
        let result = 0;
        if(scope.data.cart.productList.length <= 0) return 0

        result = scope.data.cart.productList.reduce((a={price:0, qtd: 0}, b={price:0, qtd: 0})=>{
            return {price: (a.price * a.qtd) + (b.price * b.qtd), qtd: 1}
        }).price

        return result
    }


    scope.setShowModal = ()=>{
        scope.config.show.modal = true
    }
    scope.setHideModal = ()=>{
        scope.config.show.modal = false
    }

    scope.setSelectedAccount = function(account){
        if(!account) account = scope.data.accountList[0]
        scope.data.account = account
        scope.setHideModal()
    }

    scope.getMenuActivated = function(item){
        let itemActivated = scope.config.show.modal ? 'contas' : 'home'
        return item === itemActivated
    }

    scope.init = function(){
       scope.setSelectedAccount()
    }
}]