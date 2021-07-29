public without sharing class LA_AccountController {
    public static AccountDTO getAccountList(){

        AccountDTO result;

        try {
            result = new AccountDTO();

            for(Account account : [
                SELECT Id, Name, Phone
                FROM Account
                LIMIT 100
            ]){
                result.data.add(new AccountInfo(account));
            }

        } catch (Exception ex) {
            result = new AccountDTO(ex);
        }
        return result;
    }

    public class AccountDTO extends RemotingResult{
        public List<AccountInfo> data = new List<AccountInfo>();

        public AccountDTO(){
            super();
        }
        public AccountDTO(Exception e){
            super(e);
        }
    }

    public class AccountInfo{
        public String id;
        public String name;
        public String phone;

        public AccountInfo(){}

        public AccountInfo(Account account){
            this.id = account.Id;
            this.name = account.Name;
            this.phone = account.Phone;
        }
    }
}
