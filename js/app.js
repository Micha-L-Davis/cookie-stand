'use strict';

//#region Global Document Reference

let salesTableSection = document.getElementById('sales-table');
let salesFormSection = document.getElementById('form');

//#endregion

//#region Store Constructor and Prototyping

let Store = function (location, minCust, maxCust, avgCookiePerSale) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiePerSale = avgCookiePerSale;
  this.hourlySales = [];
  this.trElem = document.createElement('tr');

  Store.stores.push(this);
  Store.trElems.push(this.trElem);
};

Store.stores = [];
Store.trElems = [];
Store.tableData = [];

Store.prototype.randomHourlyCustomers = function () {
  return randomIntInclusive(this.minCust, this.maxCust);
};

Store.prototype.buildSalesData = function () {
  let total = 0;
  this.hourlySales[0] = this.location;
  for (let i = 1; i < 15; i++) {
    let sales = Math.round(this.randomHourlyCustomers() * this.avgCookiePerSale);
    total += sales;
    this.hourlySales[i] = sales;
  }
  this.hourlySales[15] = total;
  Store.tableData.push(this.hourlySales);
};

Store.prototype.renderStore = function (parent, isNew = false) {
  this.buildSalesData();
  if (isNew) {
    parent.appendChild(this.trElem);
  }
  else {
    removeAllChildren(this.trElem);
  }
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

// handles the initial rendering of the table on page load
function renderSalesTable() {
  const tableElem = createElement('table', salesTableSection);
  const theadElem = createElement('thead', tableElem);
  const tbodyElem = createElement('tbody', tableElem);
  const tfootElem = createElement('tfoot', tableElem);

  const trElemHeader = createElement('tr', theadElem);
  for (let i = 0; i < headers.length; i++) {
    renderHeader(trElemHeader, headers[i]);
  }

  for (let i = 0; i < Store.stores.length; i++) {
    Store.stores[i].renderStore(tbodyElem, true);
  }

  renderFooter(tfootElem);
}

// creates an html tag element and appends it to a parent in the DOM
function createElement(tag, parent) {
  const elem = document.createElement(tag);
  parent.appendChild(elem);
  return elem;
}

// creates a footer row and populates the row data
function renderFooter(parent) {
  const trElemFooter = createElement('tr', parent);
  let footerData = totalColumnValues(Store.tableData);
  for (let i = 0; i < footerData.length; i++) {
    const thElem = createElement('th', trElemFooter);
    thElem.textContent = `${footerData[i]}`;
  }
  return trElemFooter;
}

// creates a row of th elements in the table header section
function renderHeader(parent, data) {
  const thElem = createElement('th', parent);
  thElem.textContent = `${data}`;
}

// places each item in an array into td tags in the parent row
function populateRowData(arr, parent) {
  for (let i = 0; i < arr.length; i++) {
    const tdElem = createElement('td', parent);
    tdElem.textContent = `${arr[i]}`;
  }
}

// totals each column in a 2D array and returns an array of the results
function totalColumnValues(arr2D) {
  let subTotals = [];
  subTotals[0] = 'Totals';
  for (let i = 0; i < arr2D.length; i++) {
    const row = arr2D[i];
    for (let j = 1; j < row.length; j++) {
      if (!subTotals[j]) {
        subTotals[j] = 0;
      }
      const cell = row[j];
      subTotals[j] += cell;
    }
  }
  return subTotals;
}

// returns a random int between min and max (inclusive)
function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// updates the table when a new store is added or store data is changed
function updateTableData(store, isNew = false) {
  const tableBodyElem = salesTableSection.firstChild.firstChild.nextSibling;
  store.renderStore(tableBodyElem, isNew);
  const tableFooterElem = salesTableSection.firstChild.lastChild;
  tableFooterElem.firstChild.replaceWith(renderFooter(tableFooterElem));
}

// removes all the children of a given DOM node
function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// submit button event callback function to process form data
function handleAddStore(event) {
  event.preventDefault();
  let store;

  for (let i = 0; i < Store.stores.length; i++) {
    if (event.target.location.value === Store.stores[i].location) {
      store = Store.stores[i];
      break;
    }
  }

  if (!store) {
    store = new Store(
      event.target.location.value,
      +event.target.minCust.value,
      +event.target.maxCust.value,
      +event.target.avgCookiePerSale.value);
    updateTableData(store, true);
  }
  else {
    store.minCust = +event.target.minCust.value;
    store.maxCust = +event.target.maxCust.value;
    store.avgCookiePerSale = +event.target.avgCookiePerSale.value;
    store.hourlySales = [];
    updateTableData(store);
  }

}

//#endregion

//#region Event Listeners

salesFormSection.addEventListener('submit', handleAddStore);

//#endregion
