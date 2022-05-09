'use strict';

interface ExhangeRates{
  [key: string]: { [key: string]: number; }
}

export class Bill {
  currency: string;
  expirationDate: string;
  isActive: boolean;
  lastActiveDate: string;
  balance: number;
  limit: number;

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

export class Client {
  fullName: string;
  isActive: boolean;
  id: number;
  joinDate: Date;
  creditBills: Array<Bill>;
  debetBills: Array<Bill>;

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

export class Bank {
  counter: number;
  clients: Array<Client>;

  constructor() {
    this.counter = 0;
    this.clients = [];
  }

  addClient(fullName: string, isActive: boolean): void {
    this.clients.push(new Client(fullName, isActive, this.counter++));
  }

  findClient(id: number): Client {
    for (let client of this.clients) {
      if (client.id === id) {
        return client;
      }
    }
  }

  async calculateMoneyAmount(): Promise<number> {
    let allMoney: number = 0;
    await this.requestExchangeRate().then(exchangeRates => {

      for (let client of this.clients) {

        for (let account of client.debetBills) {
          if (account.currency === 'USD') {
            allMoney += account.balance;
            continue;
          }
          let nationalValue: number = account.balance * exchangeRates[account.currency].sale;
          allMoney += nationalValue / exchangeRates['USD'].buy;
        }

        for (let account of client.creditBills) {

          let actualBalance = account.balance - account.limit;
          if (account.balance < account.limit) {
            actualBalance = account.limit - account.balance;
          }

          if (account.currency === 'USD') {
            allMoney += actualBalance;
            continue;
          }
          let nationalValue: number = actualBalance * exchangeRates[account.currency].sale;
          allMoney += nationalValue / exchangeRates['USD'].buy;
        }
      }
    });
    return allMoney;
  }

  async calculateDebtAmount(): Promise<number> {
    let debtAmount: number = 0;
    await this.requestExchangeRate().then(exchangeRates => {
      for (let client of this.clients) {
        for (let account of client.creditBills) {
          debtAmount += this.countDebt(account, exchangeRates);
        }
      }
    });
    return debtAmount;
  }  

  async calculateAccountTypeDebt(isActive: boolean): Promise<number> {
    let debtAmount: number = 0;
    await this.requestExchangeRate().then(exchangeRates => {
      for (let client of this.clients) {
        if (client.isActive === isActive) {
          for (let account of client.creditBills) {
            debtAmount += this.countDebt(account, exchangeRates);
          }
        }
      }
    });
    return debtAmount;
  }  

  countDebt(account: Bill, exchangeRates: ExhangeRates): number {
    let result: number = 0;
    if (account.limit < account.balance) {
      return result;
    }

    let debt: number = account.limit - account.balance;
    if (account.currency === 'USD') {
      return result += debt;
    }
    let nationalValue: number = debt * exchangeRates[account.currency].sale;
    return result += nationalValue / exchangeRates['USD'].sale;
  }

  async requestExchangeRate(): Promise<ExhangeRates> {
    let promise: Response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
    let exchangeObject: ExhangeRates = await promise.json()
    
      .then(data => {        
        const exchangeRates: ExhangeRates = { 'UAH': { sale: 1 } };
        
        for (let rate of data) {          
          exchangeRates[rate.ccy] = {
            'buy': Number(rate.buy),
            'sale': Number(rate.sale),
          };
        }
        return exchangeRates;
      })

      .catch(() => {
        throw new Error('Data download error');
      });
    return exchangeObject;
  }
}