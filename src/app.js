// this is an example of improting data from JSON
// import 'orders' from '../data/orders.json';

import * as orders from "../data/orders.json";
import * as users from "../data/users.json";
import * as companies from "../data/companies.json";

export default (function () {
  console.log(orders[0]);
})();
