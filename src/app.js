// this is an example of improting data from JSON
// import 'orders' from '../data/orders.json';

import * as orders from "../data/orders.json";
import * as users from "../data/users.json";
import * as companies from "../data/companies.json";

function toCodeNumber(nu) {
  let code = "";
  for (let i = 0; i < nu.length; i++) {
    if (i <= 1 || i >= nu.length - 4) {
      code += nu[i];
    } else {
      code += "*";
    }
  }
  return code;
}

export default (function () {

  const formatedOrders = orders.map((item) => {
    let tr = document.createElement("tr");
    tr.setAttribute("id", `order_${item.id}`);
    let td = document.createElement("td");

    td.innerHTML = item.transaction_id;
    tr.insertCell(td);

    td.innerHTML = item.user_id;
    tr.insertCell(td);
    
    let created_at = item.created_at;
    let date = new Date(created_at);

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    let time = `${day}/${month}/${year}, ${hours}:${mins}:${secs}`;
    td.innerHTML = time;
    tr.insertCell(td);

    td.innerHTML = item.total;
    tr.insertCell(td);

    const card_number = item.card_number;
    const codedNumber = toCodeNumber(card_number);
    td.innerHTML = codedNumber;
    tr.insertCell(td);

    td.innerHTML = item.card_number;
    tr.insertCell(td);
    td.innerHTML = item.card_type;
    tr.insertCell(td);
    td.innerHTML = `${item.order_country} (${item.order_ip})`;
    tr.insertCell(td);

    return tr;
  });

  document.querySelector("tbody").append(formatedOrders);
})();
