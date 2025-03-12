import { updateSpinsDisplay } from "./Scripts/textHelper.js";
import { rotateWheel } from "./Scripts/wheel.js";
import {
  openWarningModal,
  openWelcomeModal,
  prizeModals,
} from "./Scripts/modals.js";
import { inviteFriend } from "./Scripts/invite.js";
import { highlightActiveLink } from "./Scripts/highlightLink.js";
import { getData, updateSpins } from "./Scripts/api.js";
import { getGift } from "./Scripts/api.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  const initData = tg.initData;

  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  let spins = 0;
  let referralLink = "";

  const data = await getData(initData);
  console.log(data);

  openWelcomeModal(data.spentSpins);

  const balanceText = document.getElementById("balance");
  let balance = data.balance;
  balanceText.innerText = `Баланс: ${balance}`;

  spins = data.spins;
  referralLink = data.referralLink;

  const giftCooldown = 24 * 60 * 60 * 1000; // 24 часа

  const [datePart, timePart] = data.registrationDate.split("_");
  const [day, month, year] = datePart.split(":");
  const registrationDate = new Date(`${year}-${month}-${day}T${timePart}`);
  let nextGiftTime = new Date(registrationDate.getTime() + giftCooldown);

  const inviteBtn = document.getElementById("inviteFriendBtn");
  inviteBtn.addEventListener("click", () => inviteFriend(tg, referralLink));

  updateSpinsDisplay(spins);

  const freeSpinButton = document.getElementById("freeSpinButton");
  const timerElement = document.getElementById("timer");
  const timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const now = new Date();
    const diff = nextGiftTime - now;

    if (diff <= 0) {
      freeSpinButton.addEventListener("pointerdown", giftHandler);
      timerElement.innerText = "";
      freeSpinButton.disabled = false;
      freeSpinButton.innerText = "Получить";
      clearInterval(timerInterval);
    } else {
      freeSpinButton.removeEventListener("pointerdown", giftHandler);
      freeSpinButton.disabled = true;
      freeSpinButton.classList.add("disabled_btn");
      timerElement.classList.add("disabled_timer");
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
      await getGift(initData);

      nextGiftTime = new Date(new Date().getTime() + giftCooldown);
      spins += 1;
      updateSpinsDisplay(spins);

      freeSpinButton.disabled = true;
      freeSpinButton.classList.add("disabled_btn");
      timerElement.classList.add("disabled_timer");

      clearInterval(timerInterval);
      updateTimer();
      setInterval(updateTimer, 1000);
    } catch (error) {
      console.error("Ошибка при получении подарка:", error);
      alert("Не удалось получить подарок. Попробуйте снова.");
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
    }, 4600);

    const result = await updateSpins(initData);
    console.log(result, "JOPA");

    spins = result.spins;
    if (spins === 0) {
      btnMinus.removeEventListener("pointerdown", handleButtonClick);
      btnMinus.addEventListener("pointerdown", openWarningModal);
    }
    updateSpinsDisplay(spins);

    const prize = result.prize?.value || "";
    const degree = result.prize?.degree;
    const link = result.prize?.link;
    const actualBalance = result.balance;
    console.log(`Приз: ${prize}, Угол: ${degree}, Баланс: ${actualBalance}`);

    rotateWheel(degree);
    prizeModals(prize, link, actualBalance);
    if (result.prize?.value === "spin") {
      const actualData = await getData(initData);
      spins = actualData.spins;
      setTimeout(() => {
        updateSpinsDisplay(spins);
      }, 4000);
    }
  }

  if (spins !== 0) {
    btnMinus.removeEventListener("pointerdown", openWarningModal);
    btnMinus.addEventListener("pointerdown", handleButtonClick);
  } else {
    btnMinus.removeEventListener("pointerdown", handleButtonClick);
    btnMinus.addEventListener("pointerdown", openWarningModal);
  }

  const currentPath = window.location.pathname.replace(
    /^\/Pages\/(.+)/,
    "./$1"
  );

  highlightActiveLink(currentPath);
});
