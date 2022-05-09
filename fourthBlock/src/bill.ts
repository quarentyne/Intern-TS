'use strict';

import { displayError, checkMoney, checkCurrency, checkDate } from "./checking.js";
import { Bank, Bill } from "./object.js";
import { renderMainContent, mainContent, errorPlace } from "./renderContent.js";

export function renderBill(clientBill: Bill, place: HTMLUListElement,
  bills: Array<Bill>, bank: Bank): void {
  
  const bill: HTMLDivElement = document.createElement('div');
  bill.classList.add('bill');
  place.append(bill);

  const billCurrent: HTMLDivElement = document.createElement('div');
  billCurrent.classList.add('bill__current');
  bill.append(billCurrent);

  const billBalance: HTMLParagraphElement = document.createElement('p');
  billCurrent.append(billBalance);
  billBalance.innerHTML = 'Balance: ' + clientBill.balance;

  const billLimit: HTMLParagraphElement = document.createElement('p');
  if (clientBill.limit !== null) {
    billCurrent.append(billLimit);
    billLimit.innerHTML = 'Limit: ' + clientBill.limit;
  }

  const billCurrency: HTMLParagraphElement = document.createElement('p');
  billCurrent.append(billCurrency);
  billCurrency.innerHTML = 'Currency: ' + clientBill.currency;

  const billExpiration: HTMLParagraphElement = document.createElement('p');
  billExpiration.innerHTML = 'Expiration date: ' + clientBill.expirationDate;
  bill.append(billExpiration);

  const billFooter: HTMLDivElement = document.createElement('div');
  billFooter.classList.add('bill__footer');
  bill.append(billFooter);

  const billLastActive: HTMLParagraphElement = document.createElement('p');
  billFooter.append(billLastActive);
  billLastActive.innerHTML = 'Last active was: ' + clientBill.lastActiveDate;

  const billIsActive: HTMLParagraphElement = document.createElement('p');
  billFooter.append(billIsActive);
  if (clientBill.isActive) {
    billIsActive.innerHTML = 'Bill is Active';
  } else {
    billIsActive.innerHTML = 'Bill is Inactive';
  }

  const billControl: HTMLDivElement = document.createElement('div');
  billControl.classList.add('control');
  bill.append(billControl);

  const billEdit: HTMLButtonElement = document.createElement('button');
  billEdit.innerHTML = 'Edit';
  billControl.append(billEdit);

  const billDelete: HTMLButtonElement = document.createElement('button');
  billDelete.innerHTML = 'Delete';
  billControl.append(billDelete);

  billEdit.addEventListener('click', (): void => {
    const editBalance: HTMLInputElement = document.createElement('input');
    const editLimit: HTMLInputElement = document.createElement('input');
    const editCurrency: HTMLInputElement = document.createElement('input');
    const editExpiration: HTMLInputElement = document.createElement('input');
    const editActivity: HTMLInputElement = document.createElement('input');
    billEdit.innerHTML = 'Save';

    const editBalanceActive: HTMLSelectElement = document.createElement('select');
    const editBalanceIsActive: HTMLOptionElement = document.createElement("option");
    const editBalanceIsInactive: HTMLOptionElement = document.createElement("option");

    editBalanceIsActive.value = 'true';
    editBalanceIsActive.text = 'Active';
    editBalanceIsInactive.value = 'false';
    editBalanceIsInactive.text = 'Inactive';
    editBalanceActive.add(editBalanceIsActive);
    editBalanceActive.add(editBalanceIsInactive);

    editBalance.value = clientBill.balance.toString();
    billBalance.innerHTML = 'Balance: ';
    billBalance.append(editBalance);

    if (clientBill.limit !== null) {
      editLimit.value = clientBill.limit.toString();
      billLimit.innerHTML = 'Limit: ';
      billLimit.append(editLimit);
    }

    editCurrency.value = clientBill.currency;
    billCurrency.innerHTML = 'Currency: ';
    billCurrency.append(editCurrency);

    editExpiration.value = clientBill.expirationDate;
    billExpiration.innerHTML = 'Expiration date: ';
    billExpiration.append(editExpiration);

    editActivity.value = clientBill.lastActiveDate;
    billLastActive.innerHTML = 'Last active date: ';
    billLastActive.append(editActivity);

    billIsActive.innerHTML = 'Bill is ';
    billIsActive.append(editBalanceActive);

    billEdit.addEventListener('click', (): void => {
      if (clientBill.limit === null) {
        editLimit.value = '0';
      }
      if (!checkMoney.test(editBalance.value) || !checkMoney.test(editLimit.value)) {
        displayError('Balance or Limit', errorPlace);
        return;
      }
      if (!checkCurrency.test(editCurrency.value)) {
        displayError('Currency', errorPlace);
        return;
      }
      if (!checkDate.test(editActivity.value) || !checkDate.test(editExpiration.value)) {
        displayError('Date', errorPlace);
        return;
      }

      if (clientBill.limit !== null) {
        clientBill.limit = Number(editLimit.value);
      }
      clientBill.balance = Number(editBalance.value);
      clientBill.currency = editCurrency.value.toUpperCase();
      clientBill.expirationDate = editExpiration.value;
      clientBill.lastActiveDate = editActivity.value;

      if (editBalanceActive.value === 'true') {
        clientBill.isActive = true;
      } else {
        clientBill.isActive = false;
      }

      mainContent.innerHTML = '';
      renderMainContent(bank.clients, bank);
    })
  })

  billDelete.addEventListener('click', (): void => {
    for (let i = 0; i < bills.length; i++) {
      if (bills[i] === clientBill) {
        bills.splice(i, 1);
        mainContent.innerHTML = '';
        renderMainContent(bank.clients, bank);
        return;
      }
    }
  })
}