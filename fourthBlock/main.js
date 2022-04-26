class Bill {
    constructor(currency, expirationDate, isActive, lastActiveDate, balance, limit) {
        this.currency = currency;
        this.expirationDate = expirationDate;
        this.isActive = isActive;
        this.lastActiveDate = lastActiveDate;
        this.balance = balance;
        this.limit = limit || null;
    }
}
class Client {
    constructor(fullName, isActive, id) {
        this.fullName = fullName;
        this.isActive = isActive;
        this.id = id;
        this.joinDate = new Date();
        this.creditBills = [];
        this.debetBills = [];
    }
    addDebetBill(currency, expirationDate, isActive, lastActiveDate, balance) {
        this.debetBills.push(new Bill(currency, expirationDate, isActive, lastActiveDate, balance));
    }
}
let bill = new Bill('usd', '2', true, '3', 100, 100);
console.log(bill);
let client = new Client('sda', true, 1);
client.addDebetBill('asd', 'a', '', 'das', 1200);
console.log(client);
