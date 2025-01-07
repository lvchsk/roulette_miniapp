import { getData } from "../../Scripts/api.js";
import { highlightActiveLink } from "../../Scripts/highlightLink.js";
import { inviteFriend } from "../../Scripts/invite.js";
import { copyText } from "../../Scripts/textHelper.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;
  // const initData =
  //   "query_id=AAFnEKlRAAAAAGcQqVFuPynM&user=%7B%22id%22%3A1370034279%2C%22first_name%22%3A%22PUG%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22mad_pug%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FC4P153sbF5ZKQ0bXj61fro_kpL2AtsdVnAeOQ2veP_Y.svg%22%7D&auth_date=1734346396&signature=tkzPFjA-_u5sC8Jn29G8iy3729vIL8fyHHyALY4aVmsnqtNXcCalZzS4GmnglECiEcO1SdHCgFeJDUHyFiPiCg&hash";

  tg.expand();

  const container = document.getElementById("container");
  container.style.position = "absolute";

  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  const referralLinkElement = document.getElementById("referralLink");
  const refferalsList = document.getElementById("referralList");

  const data = await getData(initData);

  let spins = data.spins;
  let referralLink = `https://t.me/${data.botUsername}?start=${data.referralCode}`;
  const referralList = data.referralList;

  displayFriends(referralList);

  referralLinkElement.innerText = referralLink;
  document.getElementById("spinsCount").innerText = `${spins}`;
  document.getElementById("referralsCount").innerText = referralList.length;

  const inviteBtn = document.getElementById("inviteFriendBtn");
  inviteBtn.addEventListener("click", () => inviteFriend(tg, referralLink));

  const textToCopy = referralLinkElement.innerText;
  const notification = document.getElementById("copyNotification");

  referralLinkElement.addEventListener("click", () =>
    copyText(textToCopy, notification)
  );

  function displayFriends(refferals) {
    refferalsList.innerHTML = "";

    refferals.forEach((refferal) => {
      const refferalCard = document.createElement("div");
      refferalCard.classList.add("refferal-card");

      refferalsList.appendChild(refferalCard);

      const iconContainer = document.createElement("span");
      iconContainer.classList.add("icon_container");

      const friendIcon = document.createElement("img");
      friendIcon.src = "../../Photos/friends_icon.svg";
      iconContainer.appendChild(friendIcon);

      refferalCard.appendChild(iconContainer);

      const refferalItem = document.createElement("p");
      refferalItem.textContent = refferal;
      refferalItem.id = "refferal";
      refferalCard.appendChild(refferalItem);

      const infoSpan = document.createElement("span");
      infoSpan.classList.add("info-span");
      infoSpan.innerText = "+1ВР";
      refferalCard.appendChild(infoSpan);
    });
  }

  const currentPath = window.location.pathname.replace(
    /^\/Pages\/.+\/(.+)/,
    "./$1"
  );

  highlightActiveLink(currentPath);
});
