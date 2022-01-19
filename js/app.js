'use strict';

//#region Global Document Reference

let salesTableSection = document.getElementById('sales-table');

//#endregion

//#region Store Constructor and Prototyping

let Store = function(location, minCust, maxCust, avgCookiePerSale) {
  this.location = location;
  this.maxCust = maxCust;
  this.minCust = minCust;
  this.avgCookiePerSale = avgCookiePerSale;
  this.hourlySales = [];
  this.trElem = document.createElement('tr');

  Store.stores.push(this);
  Store.trElems.push(this.trElem);
};

Store.stores = [];
Store.trElems = [];

Store.prototype.randomHourlyCustomers = function() {
  return randomIntInclusive(this.minCust, this.maxCust);
};

Store.prototype.buildSalesData = function() {
  let total = 0;
  this.hourlySales[0] = this.location;
  for (let i = 1; i < 15; i++) {
    let sales = Math.floor(this.randomHourlyCustomers() * this.avgCookiePerSale);
    total += sales;
    this.hourlySales[i] = sales;
  }
  this.hourlySales[15] = total;
};

Store.prototype.renderStore = function(parent) {
  this.buildSalesData();
  parent.appendChild(this.trElem);
  populateRowData(this.hourlySales, this.trElem);
};


//#endregion

//#region Creating stores and sales table

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

let headers = ['', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', ' Daily Location Total'];

renderSalesTable();

//#endregion

//#region Global Functions

function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createElement(tag, parent) {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  return elem;
}

function renderSalesTable() {
  const tableElem = createElement('table', salesTableSection);
  const theadElem = createElement('thead', tableElem);
  const tbodyElem = createElement('tbody', tableElem);
  const tfootElem = createElement('tfoot', tableElem);

  const trElemHeader = createElement('tr', theadElem);
  for (let i = 0; i < headers.length; i++){
    renderHeader(trElemHeader, headers[i]);
  }

  let tableData = [];
  for (let i = 0; i < Store.stores.length; i++) {
    Store.stores[i].renderStore(tbodyElem);
    tableData[i] = Store.stores[i].hourlySales;
  }

  const trElemFooter = createElement('tr', tfootElem);
  let footerData = totalColumnValues(tableData);
  for (let i = 0; i < footerData.length; i++){
    renderFooter(trElemFooter, footerData[i]);
  }
}

function renderFooter(parent, data) {
  const thElem = createElement('th', parent);
  thElem.textContent = `${data}`;
}

function renderHeader(parent, data) {
  const thElem = createElement('th', parent);
  thElem.textContent = `${data}`;
}

function populateRowData(arr, parent) {
  for (let i = 0; i < arr.length; i++){
    const tdElem = createElement('td', parent);
    tdElem.textContent = `${arr[i]}`;
  }
}

function totalColumnValues(arr2D){
  let subTotals = [];
  subTotals[0] = 'Totals';
  for (let i = 0; i < arr2D.length; i++) {
    const row = arr2D[i];
    for (let j = 1; j < row.length; j++) {
      if (!subTotals[j]){
        subTotals[j] = 0;
      }
      const cell = row[j];
      subTotals[j] += cell;
      console.log(cell);
      console.log(subTotals[j]);
    }
  }
  return subTotals;
}

//#endregion
