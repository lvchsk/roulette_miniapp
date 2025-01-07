import { getData } from "../../Scripts/api.js";
import { copyText } from "../../Scripts/textHelper.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;

  // const initData =
  //   "query_id=AAFnEKlRAAAAAGcQqVFuPynM&user=%7B%22id%22%3A1370034279%2C%22first_name%22%3A%22PUG%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22mad_pug%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FC4P153sbF5ZKQ0bXj61fro_kpL2AtsdVnAeOQ2veP_Y.svg%22%7D&auth_date=1734346396&signature=tkzPFjA-_u5sC8Jn29G8iy3729vIL8fyHHyALY4aVmsnqtNXcCalZzS4GmnglECiEcO1SdHCgFeJDUHyFiPiCg&hash";

  tg.expand();
  alert(tg.platform)
  

  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  const userName = 'Anonymus' ?? `${tg.initDataUnsafe.user.first_name}`;
  const userNameElement = document.getElementById('userName')
  userNameElement.innerText = userName

  const count = document.getElementById("count");
  count.innerText = "0";
  const container = document.getElementById("container");
  const couponsList = document.getElementById("couponsList");

  container.style.overflow = "auto";
  container.style.position = "absolute";

  const data = await getData(initData);
  

  const coupons = data.codes;
  count.innerText = data.codes.length;
  displayCoupons(coupons);

  function displayCoupons(coupons) {
    couponsList.innerHTML = "";

    coupons.forEach((coupon) => {
      const card = document.createElement("div");
      card.classList.add("coupon-card");
      couponsList.appendChild(card);

      const couponItem = document.createElement("h6");
      couponItem.textContent = coupon;
      couponItem.id = "coupon";
      card.appendChild(couponItem);

      const copyButton = document.createElement("button");
      copyButton.textContent = "Копировать";
      copyButton.classList.add("coupon-button");
      copyButton.id = "copyLinkBtn";
      card.appendChild(copyButton);

      const textToCopy = coupon;
      const notification = document.getElementById("copyNotification");
      
      copyButton.addEventListener("click", () => copyText(textToCopy, notification));
    });
  }
});
