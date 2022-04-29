'use strict';

import { renderBill } from './bill.js';
import { renderMainContent, mainContent, errorPlace } from "./renderContent.js";
import { displayError, checkName } from "./checking.js";
import { ClientTemplate, Bank } from './object.js';

export function renderClient(place: HTMLElement, clientCard: ClientTemplate, bank: Bank): void {
  const client: HTMLDivElement = document.createElement('div');
  client.classList.add('client');
  place.append(client);

  const clientNameLine: HTMLDivElement = document.createElement('div');
  clientNameLine.classList.add('client__header');
  client.append(clientNameLine);

  const clientName: HTMLParagraphElement = document.createElement('p');
  clientNameLine.append(clientName);
  clientName.innerHTML = clientCard.fullName;

  const clientActive: HTMLParagraphElement = document.createElement('p');
  clientNameLine.append(clientActive);
  if (clientCard.isActive) {
    clientActive.innerHTML = 'Active';
  } else {
    clientActive.innerHTML = 'Inactive';
  }

  const clientDebetBills: HTMLUListElement = document.createElement('ul');
  client.append(clientDebetBills);
  clientDebetBills.innerHTML = 'Debet Bills:';

  for (let debetBill of clientCard.debetBills) {
    const clientDebetBill: HTMLLIElement = document.createElement('li');
    clientDebetBill.innerHTML = `${renderBill(debetBill, clientDebetBills, clientCard.debetBills, bank)}`;
  }

  const clientCreditBills: HTMLUListElement = document.createElement('ul');
  client.append(clientCreditBills);
  clientCreditBills.innerHTML = 'Credit Bills:';

  for (let creditBill of clientCard.creditBills) {
    const clientCreditBill: HTMLLIElement = document.createElement('li');
    clientCreditBill.innerHTML = `${renderBill(creditBill, clientCreditBills, clientCard.creditBills, bank)}`;
  }

  const clientFooter: HTMLDivElement = document.createElement('div');
  clientFooter.classList.add('client__footer');
  client.append(clientFooter);

  const clientID: HTMLParagraphElement = document.createElement('p');
  clientFooter.append(clientID);
  clientID.innerHTML = 'ID ' + clientCard.id;

  const clientJoinDate: HTMLParagraphElement = document.createElement('p');
  clientFooter.append(clientJoinDate);
  clientJoinDate.innerHTML = 'Join Date:' + clientCard.joinDate.getDate() + '.' +
    clientCard.joinDate.getMonth() + '.' + clientCard.joinDate.getFullYear();

  const clientControl: HTMLDivElement = document.createElement('div');
  client.append(clientControl);
  clientControl.classList.add('control');

  const clientEdit: HTMLButtonElement = document.createElement('button');
  clientEdit.innerHTML = 'Edit';
  clientControl.append(clientEdit);

  const clientDelete: HTMLButtonElement = document.createElement('button');
  clientDelete.innerHTML = 'Delete';
  clientControl.append(clientDelete);

  clientEdit.addEventListener('click', (): void => {
    const changeName: HTMLInputElement = document.createElement('input');
    changeName.value = clientCard.fullName;
    clientName.innerHTML = '';
    clientName.append(changeName);
    clientEdit.innerHTML = 'Save';

    const changeClientActive: HTMLSelectElement = document.createElement('select');
    const changeIsActive: HTMLOptionElement = document.createElement("option");
    const changeIsInactive: HTMLOptionElement = document.createElement("option");

    changeIsActive.value = 'true';
    changeIsActive.text = 'Active';
    changeIsInactive.value = 'false';
    changeIsInactive.text = 'Inactive';

    changeClientActive.add(changeIsActive);
    changeClientActive.add(changeIsInactive);
    clientActive.innerHTML = '';
    clientActive.append(changeClientActive);

    clientEdit.addEventListener('click', (): void => {
      if (!checkName.test(changeName.value)) {
        displayError('Name', errorPlace);
        return;
      }

      if (changeClientActive.value === 'true') {
        clientCard.isActive = true;
      } else {
        clientCard.isActive = false;
      }

      clientCard.fullName = changeName.value;
      mainContent.innerHTML = '';
      renderMainContent(bank.clients, bank);
    })
  })

  clientDelete.addEventListener('click', ():void => {
    for (let i = 0; i < bank.clients.length; i++) {
      if (bank.clients[i] === clientCard) {
        bank.clients.splice(i, 1);
        mainContent.innerHTML = '';
        renderMainContent(bank.clients, bank);
        break;
      }
    }
  })
}