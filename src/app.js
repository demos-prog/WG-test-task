import * as orders from "../data/orders.json";
import * as users from "../data/users.json";
import * as companies from "../data/companies.json";

function toCodeNumber(num) {
  let code = "";
  for (let i = 0; i < num.length; i++) {
    if (i <= 1 || i >= num.length - 4) {
      code += num[i];
    } else {
      code += "*";
    }
  }
  return code;
}

export default (function () {
  orders.forEach((item) => {
    let tr = document.createElement("tr");
    tr.setAttribute("id", `order_${item.id}`);

    let transaction = document.createElement("td");
    transaction.innerHTML = item.transaction_id;
    tr.appendChild(transaction);

    let userInfo = document.createElement("td");
    userInfo.classList.add("user_data");
    let userInfoLink = document.createElement("a");
    userInfoLink.href = "#";

    const user = users.find((it) => it.id === item.id);
    if (user) {
      let userGender = user.gender;
      let mr = "Mr.";
      if (userGender === "Female") {
        mr = "Ms.";
      }
      const firstName = user.first_name;
      const lastName = user.last_name;
      const str = `${mr} ${firstName} ${lastName}`;
      userInfoLink.innerHTML = str;
      userInfo.appendChild(userInfoLink);
      tr.appendChild(userInfo);
    } else {
      let userInfo2 = document.createElement("td");
      userInfo.classList.add("user_data");
      userInfo2.innerHTML = item.id;
      tr.appendChild(userInfo2);
    }

    let orderDate = document.createElement("td");
    let created_at = item.created_at;
    let date = new Date(+created_at);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let time = `${day}/${month + 1}/${year}, ${hours}:${mins}:${secs}`;
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

    document.querySelector("tbody").append(tr);
  });
})();
