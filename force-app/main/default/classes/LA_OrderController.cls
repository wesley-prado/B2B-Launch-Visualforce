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

    public static List<OrderInfoDTO> getOrders(){
        List<OrderInfoDTO> orderList = new List<OrderInfoDTO>();

        for(Order order : [
            SELECT EffectiveDate, OrderNumber, Account.Name, TotalAmount,
            (SELECT Quantity from OrderItems)
            FROM Order
            WHERE TotalAmount > 0
            ORDER BY EffectiveDate DESC
        ]){
            orderList.add(new OrderInfoDTO(order));
        }

        return orderList;
    }

    public class OrderInfoDTO{
        public String effectiveDate;
        public String orderNumber;
        public String accountName;
        public Decimal itemQuantity;
        public Decimal totalAmount;

        public OrderInfoDTO(Order order){
          this.effectiveDate = String.valueOf(order.effectiveDate);
          this.orderNumber = order.orderNumber;
          this.accountName = order.Account.Name;
          this.totalAmount = order.TotalAmount;
          this.itemQuantity = this.sumQuantity(order.OrderItems);
        }

        private Decimal sumQuantity(List<OrderItem> oiList){
            Decimal sum = 0;
            for(OrderItem orderItem : oiList){
                sum += orderItem.Quantity;
            }

            return sum;
        }
    }

    public class OrderRequestDTO {
        public String accountId;
        public List<LA_ProductController.ProductInfo> productList = new List<LA_ProductController.ProductInfo>();
    }
}
