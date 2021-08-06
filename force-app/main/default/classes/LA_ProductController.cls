public without sharing class LA_ProductController {
    public static String pbName = 'Catálogo de preços';

    public static ProductDTO getProductList(){
        ProductDTO result;
        try {
            result = new ProductDTO();

            String pbId;

            for(Pricebook2 pb : [
                SELECT Id
                FROM Pricebook2
                WHERE Name = :pbName
                LIMIT 1
            ]){
                pbId = pb.Id;
            }

            if(String.isBlank(pbId)) {
                return new ProductDTO(true, 'Catálogo de preços não encontrado!');
            }

            for(PricebookEntry pbe: [
                SELECT Id, UnitPrice, Product2.Id, Product2.Name, Product2.Description
                FROM PricebookEntry
                WHERE Pricebook2Id =: pbId
                LIMIT 100
            ]){
                result.data.add(new ProductInfo(pbe));
            }
        } catch (Exception ex) {
            result = new ProductDTO(ex);
        }
        return result;
    }

    public static ProductDTO getOrderDetails(String orderId){
        ProductDTO result = new ProductDTO();

        return result
    }
    public class ProductDTO extends RemotingResult{
        public List<ProductInfo> data = new List<ProductInfo>();

        public ProductDTO(){
            super();
        }
        public ProductDTO(Exception ex){
            super(ex);
        }
        public ProductDTO(Boolean hasError, String message){
            super(hasError, message);
        }
    }
    public class ProductInfo{
        public String  id;
        public String  pdeId;
        public String  image = 'https://img.simplustec.com.br/product_images/7891515503659/1/7891515503659_1_1_200_72_RGB.png';
        public String  name;
        public String  description;
        public Decimal price;
        public Decimal qtd = 1;

        public ProductInfo(){}
        
        public ProductInfo(PricebookEntry pbe){
            this.pdeId = pbe.Id;
            this.id = pbe.Product2.Id;
            this.name = pbe.Product2.Name;
            this.description = pbe.Product2.Description;
            this.price = pbe.UnitPrice;
        }
    }
}
