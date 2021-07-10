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

function makeDate(num) {
  if (num < 10) {
    return "0" + num;
  } else return num;
}

export default (function () {
  const table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let trh = document.createElement("tr");

  let transactionHead = document.createElement("th");
  transactionHead.innerHTML = "Transaction ID";
  trh.appendChild(transactionHead);

  let userInfoHead = document.createElement("th");
  userInfoHead.innerHTML = "User Info";
  trh.appendChild(userInfoHead);

  let orderDateHead = document.createElement("th");
  orderDateHead.innerHTML = "Order Date";
  trh.appendChild(orderDateHead);

  let orderAmountHead = document.createElement("th");
  orderAmountHead.innerHTML = "Order Amount";
  trh.appendChild(orderAmountHead);

  let cardNumberHead = document.createElement("th");
  cardNumberHead.innerHTML = "Card Number";
  trh.appendChild(cardNumberHead);

  let cardTypeHead = document.createElement("th");
  cardTypeHead.innerHTML = "Card Type";
  trh.appendChild(cardTypeHead);

  let locationHead = document.createElement("th");
  locationHead.innerHTML = "Location";
  trh.appendChild(locationHead);

  thead.appendChild(trh);
  table.appendChild(thead);
  table.appendChild(tbody);
  document.querySelector("#app").appendChild(table);

  let sortedOrders = orders.slice();

  userInfoHead.addEventListener("click", () => {
    sortedOrders = orders.sort((a, b) => +a.id - +b.id);
  });
  orderAmountHead.addEventListener("click", () => {
    sortedOrders = orders.sort((a, b) => +a.total - +b.total);
  });

  sortedOrders.forEach((item) => {
    let tr = document.createElement("tr");
    tr.setAttribute("id", `order_${item.id}`);

    let transaction = document.createElement("td");
    transaction.innerHTML = item.transaction_id;
    tr.appendChild(transaction);

    let userInfo = document.createElement("td");
    userInfo.classList.add("user_data");
    let userInfoLink = document.createElement("a");
    userInfoLink.href = "#";
    let userDetailsDiv = document.createElement("div");
    userDetailsDiv.classList.add("user-details");
    const companyInfo = companies.find((it) => it.id === item.id);
    const user = users.find((it) => it.id === item.id);

    let birthday = document.createElement("p");
    let birthdayDate = "";
    if (user) {
      if (user.birthday) {
        let bthDate = new Date(+user.birthday);
        let bthDay = bthDate.getDate();
        let bthMnth = bthDate.getMonth();
        let bthYear = bthDate.getFullYear();
        birthdayDate += `${makeDate(bthDay)}/${makeDate(
          bthMnth + 1
        )}/${makeDate(bthYear)}`;
      }
    }
    birthday.innerHTML = `Birthday: ${birthdayDate}`;
    userDetailsDiv.appendChild(birthday);

    let avatar = document.createElement("p");
    let avatarImg = document.createElement("img");
    if (user) {
      avatarImg.setAttribute("src", `${user.avatar}`);
      avatarImg.setAttribute("width", "100px");
      avatar.appendChild(avatarImg);
    } else {
      avatar.innerHTML = "There is no avatar!";
    }
    userDetailsDiv.appendChild(avatar);

    let companyP = document.createElement("p");
    companyP.innerHTML = "Company: ";
    let companyLink = document.createElement("a");
    companyLink.href = "#";
    companyLink.innerHTML = "There is no company!";
    if (companyInfo) {
      companyLink.href = companyInfo.url;
      companyLink.setAttribute("target", "_blank");
      companyLink.innerHTML = companyInfo.title;
    }
    companyP.appendChild(companyLink);
    userDetailsDiv.appendChild(companyP);

    let industryP = document.createElement("p");
    industryP.innerHTML = "Industry: empty";
    if (companyInfo) {
      industryP.innerHTML = `Industry: ${companyInfo.industry} / ${companyInfo.sector}`;
    }
    userDetailsDiv.appendChild(industryP);

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
      userInfo.appendChild(userDetailsDiv);
      tr.appendChild(userInfo);
    } else {
      userInfo.innerHTML = item.id;
      userInfo.appendChild(userDetailsDiv);
      tr.appendChild(userInfo);
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

    userInfoLink.addEventListener("click", (e) => {
      e.preventDefault();
      let hides = document.querySelectorAll(".user-details");
      hides.forEach((item) => {
        item.classList.remove("show");
      });
      let closestP = e.target.nextSibling;
      closestP.classList.add("show");
    });

    document.querySelector("tbody").append(tr);
  });
})();
