public without sharing class LA_Controller {
    public static String accountList {get;set;}

    public LA_Controller() {
        LA_AccountController.AccountDTO accountResult = getAccountList();

        if(!accountResult.hasError){
            accountList = JSON.serialize(accountResult.data).escapeEcmaScript();
        }else{
            accountList = '[]';
        }
    }

    @RemoteAction
    public static LA_AccountController.AccountDTO getAccountList(){
        return LA_AccountController.getAccountList();
    }
    @RemoteAction
    public static LA_ProductController.ProductDTO getProductList(){
        return LA_ProductController.getProductList();
    }
    @RemoteAction
    public static RemotingResult setOrder(LA_OrderController.OrderRequestDTO request){
        return LA_OrderController.setOrder(request);
    }
    @RemoteAction
    public static LA_OrderController.OrderInfoDTO getOrders(){
        return LA_OrderController.getOrders();
    }
}
