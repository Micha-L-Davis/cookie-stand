'use strict';

let salesListSection = document.getElementById('sales-list');

let seattle = {
  location: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgCookiePerSale: 6.3,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      let sales = Math.floor(this.randomHourlyCustomers() * this.avgCookiePerSale);
      total += sales;
      let time = i + 6;
      if (time <= 11){
        time = `${time}am`;
      }
      else if (time === 12){
        time = `${time}pm`;
      }
      else {
        time = `${time - 12}pm`;
      }
      this.hourlySales[i] = `${time}: ${sales} cookies`;
    }
    this.hourlySales[13] = `Total: ${total} cookies`;
  }
};

let tokyo = {
  location: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgCookiePerSale: 1.2,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      let sales = Math.floor(this.randomHourlyCustomers() * this.avgCookiePerSale);
      total += sales;
      let time = i + 6;
      if (time <= 11){
        time = `${time}am`;
      }
      else if (time === 12){
        time = `${time}pm`;
      }
      else {
        time = `${time - 12}pm`;
      }
      this.hourlySales[i] = `${time}: ${sales} cookies`;
    }
    this.hourlySales[13] = `Total: ${total} cookies`;
  }
};

let dubai = {
  location: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgCookiePerSale: 2.3,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      let sales = Math.floor(this.randomHourlyCustomers() * this.avgCookiePerSale);
      total += sales;
      let time = i + 6;
      if (time <= 11){
        time = `${time}am`;
      }
      else if (time === 12){
        time = `${time}pm`;
      }
      else {
        time = `${time - 12}pm`;
      }
      this.hourlySales[i] = `${time}: ${sales} cookies`;
    }
    this.hourlySales[13] = `Total: ${total} cookies`;
  }
};

let paris = {
  location: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgCookiePerSale: 2.3,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      let sales = Math.floor(this.randomHourlyCustomers() * this.avgCookiePerSale);
      total += sales;
      let time = i + 6;
      if (time <= 11){
        time = `${time}am`;
      }
      else if (time === 12){
        time = `${time}pm`;
      }
      else {
        time = `${time - 12}pm`;
      }
      this.hourlySales[i] = `${time}: ${sales} cookies`;
    }
    this.hourlySales[13] = `Total: ${total} cookies`;
  }
};

let lima = {
  location: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgCookiePerSale: 4.6,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      let sales = Math.floor(this.randomHourlyCustomers() * this.avgCookiePerSale);
      total += sales;
      let time = i + 6;
      if (time <= 11){
        time = `${time}am`;
      }
      else if (time === 12){
        time = `${time}pm`;
      }
      else {
        time = `${time - 12}pm`;
      }
      this.hourlySales[i] = `${time}: ${sales} cookies`;
    }
    this.hourlySales[13] = `Total: ${total} cookies`;
  }
};

let stores = [seattle, tokyo, dubai, paris, lima];

function createSalesLists() {
  for (let i = 0; i < stores.length; i++) {
    createListHeader(stores[i]);

    const ulElem = createListBody();

    populateSalesList(stores[i], ulElem);
  }
}

function createListHeader(store) {
  const h3Elem = document.createElement('h3');
  h3Elem.textContent = `${store.location}`;
  salesListSection.appendChild(h3Elem);
  return h3Elem;
}

function createListBody() {
  const ulElem = document.createElement('ul');
  salesListSection.appendChild(ulElem);
  return ulElem;
}

function populateSalesList(store, listElement) {
  store.populateSalesData();
  for (let i = 0; i < store.hourlySales.length; i++) {
    const liElem = document.createElement('li');
    liElem.textContent = `${store.hourlySales[i]}`;
    listElement.appendChild(liElem);
  }
}

createSalesLists();
