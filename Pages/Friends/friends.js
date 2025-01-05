import { highlightActiveLink } from "../../Scripts/highlightLink.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;

  tg.expand();

  let spins = 0;
  let referralLink = "";
  const referrals = [];

  const container = document.getElementById("container");
  // container.style.height = '80vh';
  container.style.position = "absolute";

  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  try {
    const response = await fetch("https://bestx.cam/webapp-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData }),
    });

    if (!response.ok) {
      throw new Error(`Server returned code ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      console.log(data);

      spins = data.spins;
      referralLink = `https://t.me/${data.botUsername}?start=${data.referralCode}`;
      referrals.push(...data.referralList);
      displayFriends(referrals);

      document.getElementById("referralLink").innerText = referralLink;
      document.getElementById("spinsCount").innerText = `${spins}`;
      document.getElementById("referralsCount").innerText = referrals.length;
    }
  } catch (err) {
    console.error("Ошибка при получении данных:", err);
    alert("Ошибка при загрузке данных. Попробуйте позже.");
  } finally {
    loading.style.display = "none";
  }

  document.getElementById("inviteFriendBtn").addEventListener("click", () => {
    if (tg.openContactPicker) {
      tg.openContactPicker({
        message: `Переходи по ссылке в лучшую Telegram рулетку, вращай и получай купоны от 500₽ до 30000₽ на WB: ${referralLink}`,
      })
        .then((result) => {
          if (result && result.contacts) {
            alert(`Сообщение отправлено ${result.contacts.length} контактам!`);
          } else {
            alert("Отмена выбора контактов.");
          }
        })
        .catch((error) => {
          console.error("Ошибка при открытии контакт-пикера:", error);
          alert("Не удалось открыть список контактов.");
        });
    } else {
      const message = encodeURIComponent(
        `Переходи по ссылке в лучшую Telegram рулетку, вращай и получай купоны от 500₽ до 30000₽ на WB:`
      );
      window.open(
        `https://t.me/share/url?url=${referralLink}&text=${message}`,
        "_blank"
      );
    }
  });

  document
    .getElementById("referralLink")
    .addEventListener("click", async () => {
      const textToCopy = document.getElementById("referralLink").innerText;
      const notification = document.getElementById("copyNotification");

      try {
        await navigator.clipboard.writeText(textToCopy);

        notification.textContent = "Ссылка скопирована!";
        notification.classList.add("show");
        notification.classList.remove("hidden");

        setTimeout(() => {
          notification.classList.remove("show");
        }, 3000);
      } catch (err) {
        console.error("Ошибка при копировании ссылки:", err);

        notification.textContent = "Ошибка при копировании.";
        notification.classList.add("show");
        notification.classList.remove("hidden");

        setTimeout(() => {
          notification.classList.remove("show");
        }, 3000);
      }
    });

  function displayFriends(refferals) {
    const refferalsList = document.getElementById("referralList");
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
