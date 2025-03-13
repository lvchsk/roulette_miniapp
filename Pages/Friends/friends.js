import { getData } from "../../Scripts/api.js";
import { highlightActiveLink } from "../../Scripts/highlightLink.js";
import { inviteFriend } from "../../Scripts/invite.js";
import { copyText } from "../../Scripts/textHelper.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;
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

  console.log(referralList);
  console.log(window.Telegram);
  

  displayFriends(referralList);

  referralLinkElement.innerText = referralLink;
  document.getElementById("spinsCount").innerText = `${spins}`;
  document.getElementById("referralsCount").innerText = referralList.length;

  const inviteBtn = document.getElementById("inviteFriendBtn");
  inviteBtn.addEventListener("click", () =>
    inviteFriend(tg, referralLink)
  );

  const textToCopy = referralLinkElement.innerText;
  const notification = document.getElementById("copyNotification");
  const copyIcon = document.getElementById("copyIcon");

  referralLinkElement.addEventListener("click", () => {
    copyText(textToCopy, notification);
  });

  copyIcon.addEventListener("click", () => {
    copyText(textToCopy, notification);
  });

  function displayFriends(refferals) {
    refferalsList.innerHTML = "";
    refferals.forEach((refferal) => {
      console.log(refferal);

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
      refferalItem.textContent = refferal.username;
      refferalItem.id = "refferal";
      refferalCard.appendChild(refferalItem);

      const infoSpan = document.createElement("span");
      infoSpan.classList.add("info-span");
      if (refferal.status) {
        infoSpan.textContent = "+1ВР +10⭐️";
      } else {
        infoSpan.textContent = "";
      }
      refferalCard.appendChild(infoSpan);
    });
  }

  const currentPath = window.location.pathname.replace(
    /^\/Pages\/.+\/(.+)/,
    "./$1"
  );

  highlightActiveLink(currentPath);
});
