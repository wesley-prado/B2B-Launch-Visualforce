public without sharing class LA_OrderController {
    public static String pbName = 'Catálogo de preços';
    public static RemotingResult setOrder(OrderRequestDTO request){
        
        Savepoint sp = Database.setSavepoint();
        RemotingResult result;
        try {
            result = new RemotingResult();

            String pbId;

            for(Pricebook2 pb : [
                SELECT Id
                FROM Pricebook2
                WHERE Name = :pbName
                LIMIT 1
            ]){
                pbId = pb.Id;
            }

            Contract contract;

            for(Contract c:[
                SELECT Id
                FROM Contract
                WHERE AccountId = :request.accountId
                ORDER BY StartDate DESC
                LIMIT 1
            ]){
                contract = c;
            }

            if(contract == null){
                contract = new Contract(
                    AccountId = request.accountId,
                    StartDate = Date.today(),
                    ContractTerm = 12
                );

                insert contract;
            }

            Order order = new Order(
                Pricebook2Id = pbid,
                AccountId = request.accountId,
                ContractId = contract.id,
                Status = 'Draft',
                EffectiveDate = Date.today()
            );

            insert order;

            List<OrderItem> orderItemList = new List<OrderItem>();

            for(LA_ProductController.ProductInfo product : request.productList){
                orderItemList.add(
                    new OrderItem(
                        orderId = order.id,
                        PricebookEntryId = product.pdeId,
                        product2Id = product.id,
                        Quantity = product.qtd,
                        UnitPrice = product.price
                    )
                );
            }

            insert orderItemList;

            result.setMessage('Seu pedido foi recebido com sucesso e está sendo processado pelo nosso time!');

        } catch (Exception ex) {
            Database.rollback(sp);
            result = new RemotingResult(ex);
        }
        return result;
    }

    public static OrderInfoDTO getOrders(){
        OrderInfoDTO result = new OrderInfoDTO();

        try {
            for(Order order : [
                SELECT EffectiveDate, OrderNumber, AccountId, Account.Name, TotalAmount, Account.Phone,
                (SELECT Quantity from OrderItems)
                FROM Order
                WHERE TotalAmount > 0
                ORDER BY EffectiveDate DESC
            ]){
                result.data.add(new OrderInfo(order));
            }
        } catch (Exception ex) {
            result = new OrderInfoDTO(ex);
        }

        return result;
    }

    public static OrderDetailsDTO getOrderDetails(String orderNumber){
        OrderDetailsDTO result = new OrderDetailsDTO();

        try {
            for(Order order : [
                SELECT OrderNumber, Account.Name,EffectiveDate, TotalAmount,
                (SELECT Product2Id, Product2.Name, UnitPrice, Quantity, TotalPrice FROM OrderItems)
                FROM Order
                WHERE OrderNumber = : orderNumber
                AND TotalAmount > 0
                LIMIT 1
            ]){
                result.data.add(new OrderDetails(order));
            }
        } catch (Exception ex) {
            result = new OrderDetailsDTO(ex);
        }

        return result;
    }

    public class OrderDetailsDTO extends RemotingResult{
        List<OrderDetails> data = new List<OrderDetails>();

        public OrderDetailsDTO(){
            super();
        }
        public OrderDetailsDTO(Exception ex){
            super(ex);
        }
        public OrderDetailsDTO(Boolean hasError, String message){
            super(hasError, message);
        }
    }

    public class OrderDetails{
        public String orderNumber;
        public String effectiveDate;
        public String accountName; 
        public Decimal totalAmount;
        Public Decimal itemQuantity = 0;
        public List<ProductDetails> productList = new List<ProductDetails>();

        public OrderDetails(Order order){
            this.orderNumber = order.OrderNumber;
            this.effectiveDate = String.valueOf(order.EffectiveDate);
            this.accountName = order.Account.Name;
            this.totalAmount = order.TotalAmount;

            for(OrderItem orderItem : order.OrderItems){
                this.itemQuantity+= orderItem.Quantity;
                productList.add(new ProductDetails(orderItem));
            }
        }
    }

    public class ProductDetails{
        public String productId;
        public String  image = 'https://img.simplustec.com.br/product_images/7891515503659/1/7891515503659_1_1_200_72_RGB.png';
        public String  name;
        public Decimal unitPrice;
        public Decimal totalPrice;
        public Decimal qtd;

        public ProductDetails(OrderItem orderItem){
            this.productId = orderItem.Product2Id;
            this.name = orderItem.Product2.Name;
            this.unitPrice = orderItem.UnitPrice;
            this.totalPrice = orderItem.TotalPrice;
            this.qtd = orderItem.Quantity;
        }
    }

    public class OrderInfoDTO extends RemotingResult{
        List<OrderInfo> data = new List<OrderInfo>();

        public OrderInfoDTO(){
            super();
        }
        public OrderInfoDTO(Exception ex){
            super(ex);
        }
        public OrderInfoDTO(Boolean hasError, String message){
            super(hasError, message);
        }
    }
    public class OrderInfo{
        public String effectiveDate;
        public String orderNumber;
        public String accountId;
        public String accountName;
        public String accountPhone;
        public Decimal itemQuantity = 0;
        public Decimal totalAmount;

        public OrderInfo(Order order){
          this.effectiveDate = String.valueOf(order.effectiveDate);
          this.orderNumber = order.orderNumber;
          this.AccountId = order.AccountId;
          this.accountName = order.Account.Name;
          this.accountPhone = order.Account.Phone;
          this.totalAmount = order.TotalAmount;
          
          for(OrderItem orderItem : order.OrderItems){
              this.itemQuantity+= orderItem.Quantity;
          }
        }

    }

    public class OrderRequestDTO {
        public String accountId;
        public List<LA_ProductController.ProductInfo> productList = new List<LA_ProductController.ProductInfo>();
    }
}
