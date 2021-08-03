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

    public class OrderRequestDTO {
        public String accountId;
        public List<LA_ProductController.ProductInfo> productList = new List<LA_ProductController.ProductInfo>();
    }
}
