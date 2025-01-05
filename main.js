import { updateSpinsDisplay } from "./Scripts/textHelper.js";
import { rotateWheel } from "./Scripts/wheel.js";
import { prizeModals } from "./Scripts/modals.js";
import { inviteFriend } from "./Scripts/invite.js";
import { highlightActiveLink } from "./Scripts/highlightLink.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  
  const giftCooldown = 24 * 60 * 60 * 1000; // 24 часа
  
  const initData = tg.initData;

  const loading = document.getElementById("loading");
  loading.style.display = "flex";
  
  let spins = 0;
  let referralLink = "";
  let nextGiftTime;
  
  inviteFriend(tg, referralLink);
  
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
      spins = data.spins;
      referralLink = `https://t.me/rollingwinbot?start=${data.referralCode}`;

      const [datePart, timePart] = data.registrationDate.split("_");
      const [day, month, year] = datePart.split(":");
      const registrationDate = new Date(`${year}-${month}-${day}T${timePart}`);
      nextGiftTime = new Date(registrationDate.getTime() + giftCooldown);
    }
  } catch (err) {
    console.error("Ошибка при получении данных:", err);
    alert("Ошибка при загрузке данных. Попробуйте позже.");
  } finally {
    loading.style.display = "none";
  }

  updateSpinsDisplay(spins);

  const freeSpinButton = document.getElementById("freeSpinButton");
  const timerElement = document.getElementById("timer");
  const timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const now = new Date();
    const diff = nextGiftTime - now;

    if (diff <= 0) {
      // freeSpinButton.addEventListener("click", giftHandler);
      freeSpinButton.addEventListener("touchstart", giftHandler);
      timerElement.innerText = "";
      freeSpinButton.disabled = false;
      freeSpinButton.innerText = "Получить";
      clearInterval(timerInterval);
    } else {
      // freeSpinButton.removeEventListener("click", giftHandler);
      freeSpinButton.removeEventListener("touchstart", giftHandler);
      freeSpinButton.disabled = true;
      freeSpinButton.classList.add('disabled_btn');
      timerElement.classList.add('disabled_timer')
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      timerElement.innerText = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }
  }

  updateTimer();

  async function giftHandler() {
    try {
      const response = await fetch("https://bestx.cam/plusgift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData }),
      });

      if (!response.ok) {
        throw new Error(`Server returned code ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        nextGiftTime = new Date(new Date().getTime() + giftCooldown); // Устанавливаем новое время ожидания
        spins += 1;
        updateSpinsDisplay();
        freeSpinButton.disabled = true;
        clearInterval(timerInterval);
        setInterval(updateTimer, 1000);
        updateTimer();
      }
    } catch (error) {
      console.error("Ошибка при запросе подарка:", error);
      alert("Ошибка при запросе подарка. Попробуйте позже.");
    }
  }

  const btnMinus = document.getElementById("btnMinus");

  async function handleButtonClick() {
    if (btnMinus.disabled) return;
    btnMinus.disabled = true;
    console.log("Кнопка нажата!");

    setTimeout(() => {
      btnMinus.disabled = false;
      console.log("Кнопка снова активна");
    }, 7500);
    try {
      const resp = await fetch("https://bestx.cam/update-spins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData, operation: "minus" }),
      });

      if (!resp.ok) {
        throw new Error(`Update spins failed with code ${resp.status}`);
      }

      const result = await resp.json();

      if (result.success) {
        spins = result.spins;
        updateSpinsDisplay(spins);

        // Обновление отображения приза
        const prize = result.prize.value || "";
        const degree = result.prize.degree;
        console.log(`Приз: ${prize}, Угол: ${degree}`);

        rotateWheel(degree);
        prizeModals(prize);

      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("Ошибка при уменьшении спинов:", error);
      alert("Ошибка при уменьшении спинов. Попробуйте позже.");
    }
  }

  btnMinus.addEventListener("click", handleButtonClick);
  btnMinus.addEventListener("touchstart", handleButtonClick);

  const currentPath = window.location.pathname.replace(
    /^\/Pages\/(.+)/,
    "./$1"
  );

  highlightActiveLink(currentPath);
});
