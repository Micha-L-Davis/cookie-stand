'use strict';

//#region Global Document Reference

let salesListSection = document.getElementById('sales-list');

//#endregion

//#region Store Constructor and Prototyping

let Store = function(location, minCust, maxCust, avgCookiePerSale) {
  this.location = location;
  this.maxCust = maxCust;
  this.minCust = minCust;
  this.avgCookiePerSale = avgCookiePerSale;
  this.hourlySales = [];

  Store.stores.push(this);
};

Store.stores = [];

Store.prototype.randomHourlyCustomers = function() {
  return randomIntInclusive(this.minCust, this.maxCust);
};

Store.prototype.populateSalesData = function() {
  let total = 0;
  for (let i = 0; i < 13; i++) {
    let sales = Math.floor(this.randomHourlyCustomers() * this.avgCookiePerSale);
    total += sales;
    let time = i + 6;
    time = convertTo12Hr(time);
    this.hourlySales[i] = `${time}: ${sales} cookies`;
  }
  this.hourlySales[13] = `Total: ${total} cookies`;
};

//#endregion

//#region Creating stores and sales list

// eslint-disable-next-line no-unused-vars
const seattle = new Store('Seattle', 23, 65, 6.3);
// eslint-disable-next-line no-unused-vars
const tokyo = new Store('Tokyo', 3, 24, 1.2);
// eslint-disable-next-line no-unused-vars
const dubai = new Store('Dubai', 11, 38, 2.3);
// eslint-disable-next-line no-unused-vars
const paris = new Store('Paris', 20, 38, 2.3);
// eslint-disable-next-line no-unused-vars
const lima = new Store('Lima', 2, 16, 4.6);

createStoreLists(Store.stores);

//#endregion

//#region Global Functions

function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function convertTo12Hr(time) {
  if (time <= 11) {
    time = `${time}am`;
  }
  else if (time === 12) {
    time = `${time}pm`;
  }
  else {
    time = `${time - 12}pm`;
  }
  return time;
}

// Refactor this to have the for loop contents added as a method to the Store prototype
function createStoreLists(stores) {
  for (let i = 0; i < stores.length; i++) {
    createListHeader(stores[i].location);

    const ulElem = createListBody();

    stores[i].populateSalesData();
    populateListData(stores[i].hourlySales, ulElem);
  }
}

function createListHeader(text) {
  const h3Elem = document.createElement('h3');
  h3Elem.textContent = `${text}`;
  salesListSection.appendChild(h3Elem);
  return h3Elem;
}

function createListBody() {
  const ulElem = document.createElement('ul');
  salesListSection.appendChild(ulElem);
  return ulElem;
}

function populateListData(arr, listElement) {
  for (let i = 0; i < arr.length; i++) {
    const liElem = document.createElement('li');
    liElem.textContent = `${arr[i]}`;
    listElement.appendChild(liElem);
  }
}

//#endregion
