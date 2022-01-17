'use strict';



// Location	MinCust	MaxCust	AvgCookiePerSale
// Seattle Tokyo Dubai Paris Lima

let seattle = {
  minCust: 23,
  maxCust: 65,
  avgCookiePerSale: 6.3,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.minCust - this.maxCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      this.hourlySales[i] = this.randomHourlyCustomers() * this.avgCookiePerSale;
      total += this.hourlySales;
    }
    this.hourlySales[14] = total;
  }
};

let tokyo = {
  minCust: 3,
  maxCust: 24,
  avgCookiePerSale: 1.2,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.minCust - this.maxCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      this.hourlySales[i] = this.randomHourlyCustomers() * this.avgCookiePerSale;
      total += this.hourlySales;
    }
    this.hourlySales[14] = total;
  }
};

let dubai = {
  minCust: 11,
  maxCust: 38,
  avgCookiePerSale: 2.3,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.minCust - this.maxCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      this.hourlySales[i] = this.randomHourlyCustomers() * this.avgCookiePerSale;
      total += this.hourlySales;
    }
    this.hourlySales[14] = total;
  }
};

let paris = {
  minCust: 20,
  maxCust: 38,
  avgCookiePerSale: 2.3,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.minCust - this.maxCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      this.hourlySales[i] = this.randomHourlyCustomers() * this.avgCookiePerSale;
      total += this.hourlySales;
    }
    this.hourlySales[14] = total;
  }
};

let lima = {
  minCust: 2,
  maxCust: 16,
  avgCookiePerSale: 4.6,
  hourlySales: [],
  randomHourlyCustomers: function() {
    return Math.floor(Math.random() * (this.minCust - this.maxCust + 1) + this.minCust);
  },
  populateSalesData: function() {
    let total = 0;
    for (let i = 0; i < 13; i++) {
      this.hourlySales[i] = this.randomHourlyCustomers() * this.avgCookiePerSale;
      total += this.hourlySales;
    }
    this.hourlySales[14] = total;
  }
};

let stores = [seattle, tokyo, dubai, paris, lima];


