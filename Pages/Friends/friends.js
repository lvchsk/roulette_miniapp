window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  // const initData = tg.initData;
  const initData =
    "query_id=AAFnEKlRAAAAAGcQqVFuPynM&user=%7B%22id%22%3A1370034279%2C%22first_name%22%3A%22PUG%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22mad_pug%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FC4P153sbF5ZKQ0bXj61fro_kpL2AtsdVnAeOQ2veP_Y.svg%22%7D&auth_date=1734346396&signature=tkzPFjA-_u5sC8Jn29G8iy3729vIL8fyHHyALY4aVmsnqtNXcCalZzS4GmnglECiEcO1SdHCgFeJDUHyFiPiCg&hash";

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

  function highlightActiveLink() {
    const currentPath = window.location.pathname.replace(
      /^\/Pages\/.+\/(.+)/,
      "./$1"
    );
    const links = document.querySelectorAll(".menu_item");
    console.log(
      "HREF:",
      links[0].lastChild.previousSibling.getAttribute("href")
    );

    links.forEach((link) => {
      if (link.lastChild.previousSibling.getAttribute("href") === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  highlightActiveLink();
});
