'use strict';

import { renderClient } from './client.js';
import { Bank, ClientTemplate } from './object.js';

export const mainContent: HTMLElement = document.createElement('main');
export const sideContent: HTMLElement = document.createElement('aside');
export const errorPlace: HTMLParagraphElement = document.createElement('p');

mainContent.classList.add('main-content');
sideContent.classList.add('side-content');
errorPlace.classList.add('side-content__error');

export function renderMainContent(clients: ClientTemplate[], bank: Bank): void {
  for (let client of clients) {
    renderClient(mainContent, client, bank);
  }
}