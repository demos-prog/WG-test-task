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

    let td1 = document.createElement("td");
    td1.innerHTML = item.transaction_id;
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.innerHTML = item.user_id;
    tr.appendChild(td2);

    let created_at = item.created_at;
    let date = new Date(created_at);

    let td3 = document.createElement("td");
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    let time = `${day}/${month}/${year}, ${hours}:${mins}:${secs}`;
    td3.innerHTML = time;
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.innerHTML = item.total;
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    const card_number = item.card_number;
    const codedNumber = toCodeNumber(card_number);
    td5.innerHTML = codedNumber;
    tr.appendChild(td5);

    let td6 = document.createElement("td");
    td6.innerHTML = item.card_number;
    tr.appendChild(td6);
    let td7 = document.createElement("td");
    td7.innerHTML = item.card_type;
    tr.appendChild(td7);
    let td8 = document.createElement("td");
    td8.innerHTML = `${item.order_country} (${item.order_ip})`;
    tr.appendChild(td8);

    return tr;
  });

  formatedOrders.forEach((element) => {
    document.querySelector("tbody").append(element);
  });
})();
