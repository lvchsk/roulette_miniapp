import { getData } from "../../Scripts/api.js";
// import { copyText } from "../../Scripts/textHelper.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;
  const user = tg.initDataUnsafe.user;
 
  tg.expand();

  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  const userName = user?.first_name ?? "Anonymous";
  const userNameElement = document.getElementById("userName");
  userNameElement.innerText = userName;

  const count = document.getElementById("count");
  count.innerText = "0";
  const container = document.getElementById("container");
  const couponsList = document.getElementById("couponsList");

  container.style.overflow = "auto";
  container.style.position = "absolute";

  const data = await getData(initData);

  const coupons = data.balance;
  count.innerText = coupons;
  // displayCoupons(coupons);

  // function displayCoupons(coupons) {
  //   couponsList.innerHTML = "";

  //   coupons.forEach((coupon) => {
  //     const card = document.createElement("div");
  //     card.classList.add("coupon-card");
  //     couponsList.appendChild(card);

  //     const couponItem = document.createElement("h6");
  //     couponItem.textContent = coupon;
  //     couponItem.id = "coupon";
  //     card.appendChild(couponItem);

  //     const copyButton = document.createElement("button");
  //     copyButton.textContent = "Копировать";
  //     copyButton.classList.add("coupon-button");
  //     copyButton.id = "copyLinkBtn";
  //     card.appendChild(copyButton);

  //     const textToCopy = coupon;
  //     const notification = document.getElementById("copyNotification");

  //     copyButton.addEventListener("pointerdown", () =>
  //       copyText(textToCopy, notification)
  //     );
  //   });
  // }
});
