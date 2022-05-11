'use strict';

import { displayError, checkID, checkName, checkMoney, checkCurrency, checkDate } from "./checking.js";
import { Bank } from "./object.js";
import { renderMainContent, mainContent, errorPlace } from "./renderContent.js";

export function renderSideContent(place: HTMLElement, bank: Bank): void {
  const operationBlock: HTMLDivElement = document.createElement('div');
  operationBlock.classList.add('side-content');
  place.append(operationBlock);

  const createClient: HTMLDivElement = document.createElement('div');
  createClient.classList.add('side-content__block');
  operationBlock.append(createClient);

  const createClientDatas: HTMLDivElement = document.createElement('div');
  createClient.append(createClientDatas);

  const newClientName: HTMLInputElement = document.createElement('input');
  newClientName.style.width = '100%';
  newClientName.placeholder = "ФИО";
  createClientDatas.append(newClientName);

  const newClientIsActive: HTMLSelectElement = document.createElement('select');
  createClientDatas.append(newClientIsActive);

  const activeClient: HTMLOptionElement = document.createElement("option");
  const inActiveClient: HTMLOptionElement = document.createElement("option");
  activeClient.value = 'true';
  activeClient.text = 'Active';
  inActiveClient.value = 'false';
  inActiveClient.text = 'Inactive';
  newClientIsActive.add(activeClient);
  newClientIsActive.add(inActiveClient);

  const newClientButton: HTMLButtonElement = document.createElement('button');
  newClientButton.innerHTML = 'Create new client';
  createClient.append(newClientButton);

  const addBill: HTMLDivElement = document.createElement('div');
  addBill.classList.add('side-content__block');
  operationBlock.append(addBill);

  const addBillID: HTMLInputElement = document.createElement('input');
  addBillID.placeholder = "Client ID";
  addBill.append(addBillID);

  const addBillType: HTMLSelectElement = document.createElement('select');
  addBill.append(addBillType);

  const addBillTypeDebet: HTMLOptionElement = document.createElement("option");
  const addBillTypeCredit: HTMLOptionElement = document.createElement("option");
  addBillTypeDebet.value = 'debet';
  addBillTypeDebet.text = 'Debet bill';
  addBillTypeCredit.value = 'credit';
  addBillTypeCredit.text = 'Credit bill';
  addBillType.add(addBillTypeDebet);
  addBillType.add(addBillTypeCredit);

  const addBillBalance: HTMLInputElement = document.createElement('input');
  addBillBalance.placeholder = "Balance";
  addBill.append(addBillBalance);

  const addBillLimit: HTMLInputElement = document.createElement('input');
  addBillLimit.placeholder = "Bill Limit";
  addBill.append(addBillLimit);

  const addBillCurrency: HTMLInputElement = document.createElement('input');
  addBillCurrency.placeholder = "Currency";
  addBill.append(addBillCurrency);

  const addBillIsActive: HTMLSelectElement = document.createElement('select');
  addBill.append(addBillIsActive);

  const activeBill: HTMLOptionElement = document.createElement("option");
  const inActiveBill: HTMLOptionElement = document.createElement("option");
  activeBill.value = 'true';
  activeBill.text = 'Active bill';
  inActiveBill.value = 'false';
  inActiveBill.text = 'Inactive bill';
  addBillIsActive.add(activeBill);
  addBillIsActive.add(inActiveBill);

  const addBillLastActive: HTMLInputElement = document.createElement('input');
  addBillLastActive.placeholder = "Last Active";
  addBill.append(addBillLastActive);

  const addBillExpirationDate: HTMLInputElement = document.createElement('input');
  addBillExpirationDate.placeholder = "Expiration date";
  addBill.append(addBillExpirationDate);

  const addBillButton: HTMLButtonElement = document.createElement('button');
  addBillButton.innerHTML = 'Add bill';
  addBill.append(addBillButton);

  const calculateAmount: HTMLDivElement = document.createElement('div');
  calculateAmount.classList.add('side-content__block');
  operationBlock.append(calculateAmount);

  const calculateAmountMenu = document.createElement('select');
  calculateAmount.append(calculateAmountMenu);

  const allAmount: HTMLOptionElement = document.createElement("option");
  const activeDebt: HTMLOptionElement = document.createElement("option");
  const inActiveDebt: HTMLOptionElement = document.createElement("option");
  allAmount.value = 'all';
  allAmount.text = 'All client\'s amount';
  activeDebt.value = 'true';
  activeDebt.text = 'Active client\'s debt';
  inActiveDebt.value = 'false';
  inActiveDebt.text = 'Inactive client\'s debt';
  calculateAmountMenu.add(allAmount);
  calculateAmountMenu.add(activeDebt);
  calculateAmountMenu.add(inActiveDebt);

  const calculateAmountButton: HTMLButtonElement = document.createElement('button');
  calculateAmountButton.innerHTML = 'Calculate';
  calculateAmount.append(calculateAmountButton);

  const calculateAmountResult: HTMLOutputElement = document.createElement('output');
  calculateAmountResult.innerHTML = '0$'
  calculateAmount.append(calculateAmountResult);

  operationBlock.append(errorPlace);

  newClientButton.addEventListener('click', () => {
    if (!checkName.test(newClientName.value)) {
      displayError('Name', errorPlace);
      return;
    }

    if (newClientIsActive.value === 'true') {
      bank.addClient(newClientName.value, true)
    }
    if (newClientIsActive.value === 'false') {
      bank.addClient(newClientName.value, false)
    }
    newClientName.value = '';
    mainContent.innerHTML = '';
    renderMainContent(bank.clients, bank);
  })

  addBillButton.addEventListener('click', () => {

    if (!checkID.test(addBillID.value)) {
      displayError('ID', errorPlace);
      return;
    }
    if (!checkMoney.test(addBillBalance.value) || !checkMoney.test(addBillLimit.value)) {
      displayError('Balance or Limit', errorPlace);
      return;
    }
    if (!checkCurrency.test(addBillCurrency.value)) {
      displayError('Currency', errorPlace);
      return;
    }
    if (!checkDate.test(addBillLastActive.value) || !checkDate.test(addBillExpirationDate.value)) {
      displayError('Date', errorPlace);
      return;
    }

    let isActiveBill: boolean = true;
    if (addBillIsActive.value === 'false') {
      isActiveBill = false;
    }
    if (addBillType.value === 'debet') {
      bank.findClient(parseInt(addBillID.value)).addDebetBill(addBillCurrency.value.toUpperCase(), addBillExpirationDate.value,
        isActiveBill, addBillLastActive.value, parseInt(addBillBalance.value));
    } else {
      bank.findClient(parseInt(addBillID.value)).addCreditBill(addBillCurrency.value.toUpperCase(), addBillExpirationDate.value,
        isActiveBill, addBillLastActive.value, parseInt(addBillBalance.value), parseInt(addBillLimit.value))
    }

    addBillID.value = '';
    addBillCurrency.value = '';
    addBillExpirationDate.value = '';
    addBillLastActive.value = '';
    addBillBalance.value = '';
    addBillLimit.value = '';

    mainContent.innerHTML = '';
    renderMainContent(bank.clients, bank);
  })

  calculateAmountButton.addEventListener('click', async function () {
    let result: number = 0;
    if (calculateAmountMenu.value === 'all') {
      result = await bank.calculateMoneyAmount();
    } else if (calculateAmountMenu.value === 'true') {
      result = await bank.calculateAccountTypeDebt(true);
    } else {
      result = await bank.calculateAccountTypeDebt(false);
    }
    calculateAmountResult.innerHTML = result + '$'
  })
}