import * as orders from "../data/orders.json";
import * as users from "../data/users.json";
import * as companies from "../data/companies.json";

// Затирание номера карты
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

// Сортировка таблици - нашел в интернете !!!
const getSort = ({ target }) => {
  const order = (target.dataset.order = -(target.dataset.order || -1));
  const index = [...target.parentNode.cells].indexOf(target);
  const collator = new Intl.Collator(["en", "ru"], { numeric: true });
  const comparator = (index, order) => (a, b) =>
    order *
    collator.compare(a.children[index].innerHTML, b.children[index].innerHTML);

  for (const tBody of target.closest("table").tBodies)
    tBody.append(...[...tBody.rows].sort(comparator(index, order)));

  for (const cell of target.parentNode.cells)
    cell.classList.toggle("sorted", cell === target);
};
// ===========================

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

  let symbol = document.createElement("span");
  symbol.innerHTML = "&#8595;";

  function addSymdol(e) {
    e.target.appendChild(symbol);
  }

  transactionHead.addEventListener("click", (e) => {
    getSort(e);
    addSymdol(e);
  });
  userInfoHead.addEventListener("click", (e) => {
    getSort(e);
    addSymdol(e);
  });
  orderDateHead.addEventListener("click", (e) => {
    getSort(e);
    addSymdol(e);
  });
  orderAmountHead.addEventListener("click", (e) => {
    getSort(e);
    addSymdol(e);
  });
  cardTypeHead.addEventListener("click", (e) => {
    getSort(e);
    addSymdol(e);
  });
  locationHead.addEventListener("click", (e) => {
    getSort(e);
    addSymdol(e);
  });

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

  // количество строк
  let totalCountOfStrokes = document.querySelectorAll("tbody tr");

  // общая сумма
  let totalAmount = 0;
  totalCountOfStrokes.forEach(() => {
    totalAmount += +totalCountOfStrokes[0].childNodes[3].innerHTML;
  });

  let totalCountOfStrokesTr = document.createElement("tr");
  let totalCountOfStrokesNote = document.createElement("td");
  totalCountOfStrokesNote.innerHTML = "Orders Count";
  let totalCountOfStrokesValue = document.createElement("td");
  totalCountOfStrokesValue.innerHTML = totalCountOfStrokes.length;
  totalCountOfStrokesTr.appendChild(totalCountOfStrokesNote);
  totalCountOfStrokesTr.appendChild(totalCountOfStrokesValue);
  document.querySelector("tbody").append(totalCountOfStrokesTr);

  let totalOrdersValueTr = document.createElement("tr");
  let totalOrdersValueNote = document.createElement("td");
  totalOrdersValueNote.innerHTML = "Orders Total";
  let totalOrdersValue = document.createElement("td");
  totalOrdersValue.innerHTML = `$ ${totalAmount.toFixed(2)}`;
  totalOrdersValueTr.appendChild(totalOrdersValueNote);
  totalOrdersValueTr.appendChild(totalOrdersValue);
  document.querySelector("tbody").append(totalOrdersValueTr);
})();
