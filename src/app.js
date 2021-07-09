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

    let transaction = document.createElement("td");
    transaction.innerHTML = item.transaction_id;
    tr.appendChild(transaction);

    let userInfo = document.createElement("td");
    userInfo.innerHTML = item.user_id;
    tr.appendChild(userInfo);

    let orderDate = document.createElement("td");
    let created_at = item.created_at;
    let date = new Date(+created_at);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let time = `${day}/${month}/${year}, ${hours}:${mins}:${secs}`;
    orderDate.innerHTML = time;
    tr.appendChild(orderDate);

    let orderAmount = document.createElement("td");
    orderAmount.innerHTML = item.total;
    tr.appendChild(orderAmount);

    let cardNumber = document.createElement("td");
    const card_number = item.card_number;
    const codedNumber = toCodeNumber(card_number);
    cardNumber.innerHTML = codedNumber;
    tr.appendChild(cardNumber);

    let cardType = document.createElement("td");
    cardType.innerHTML = item.card_type;
    tr.appendChild(cardType);

    let location = document.createElement("td");
    location.innerHTML = `${item.order_country} (${item.order_ip})`;
    tr.appendChild(location);

    return tr;
  });

  formatedOrders.forEach((element) => {
    document.querySelector("tbody").append(element);
  });
})();
