class Bill {
  currency: string;
  expirationDate: string;
  isActive: boolean;
  lastActiveDate: string;
  balance: number;
  limit: number | null;

  constructor(currency: string, expirationDate: string, isActive: boolean,
    lastActiveDate: string, balance: number, limit?:number | null) {
    this.currency = currency;
    this.expirationDate = expirationDate;
    this.isActive = isActive;
    this.lastActiveDate = lastActiveDate;
    this.balance = balance;
    this.limit = limit || null;
  }  
}

interface BillTemplate {
  currency: string;
  expirationDate: string;
  isActive: boolean;
  lastActiveDate: string;
  balance: number;
  limit?:number | null
}

class Client {
  fullName: string;
  isActive: boolean;
  id: number;
  joinDate: Date;
  creditBills: BillTemplate[];
  debetBills: BillTemplate[];

  constructor(fullName: string, isActive: boolean, id: number) {
    this.fullName = fullName;
    this.isActive = isActive;
    this.id = id;
    this.joinDate = new Date();
    this.creditBills = [];
    this.debetBills = [];
  }

  addDebetBill(currency: string, expirationDate: string, isActive: boolean,
    lastActiveDate: string, balance: number): void {
    this.debetBills.push(new Bill(currency, expirationDate, isActive, lastActiveDate, balance));
  }
  addCreditBill(currency: string, expirationDate: string, isActive: boolean,
    lastActiveDate: string, balance: number, limit: number): void {
    this.creditBills.push(new Bill(currency, expirationDate, isActive, lastActiveDate, balance, limit));

  }
}

