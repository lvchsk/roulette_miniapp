import { updateSpinsDisplay } from "./Scripts/textHelper.js";
import { rotateWheel } from "./Scripts/wheel.js";
import { prizeModals } from "./Scripts/modals.js";
import { inviteFriend } from "./Scripts/invite.js";
import { highlightActiveLink } from "./Scripts/highlightLink.js";
import { getData, updateSpins } from "./Scripts/api.js";
import { getGift } from "./Scripts/api.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  const initData =
    "query_id=AAFnEKlRAAAAAGcQqVFuPynM&user=%7B%22id%22%3A1370034279%2C%22first_name%22%3A%22PUG%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22mad_pug%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FC4P153sbF5ZKQ0bXj61fro_kpL2AtsdVnAeOQ2veP_Y.svg%22%7D&auth_date=1734346396&signature=tkzPFjA-_u5sC8Jn29G8iy3729vIL8fyHHyALY4aVmsnqtNXcCalZzS4GmnglECiEcO1SdHCgFeJDUHyFiPiCg&hash";

  // const initData = tg.initData;

  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  let spins = 0;
  let referralLink = "";

  const data = await getData(initData);

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
    }, 9600);

    const result = await updateSpins(initData);
    console.log(result);
    

    spins = result.spins;
    updateSpinsDisplay(spins);

    const prize = result.prize.value || "";
    const degree = result.prize.degree;
    const link = result.prize.link;
    console.log(`Приз: ${prize}, Угол: ${degree}`);

    rotateWheel(degree);
    prizeModals(prize, link);
  }

  // btnMinus.addEventListener("click", handleButtonClick);
  // btnMinus.addEventListener("touchstart", handleButtonClick);
  btnMinus.addEventListener('pointerdown', handleButtonClick);

  const currentPath = window.location.pathname.replace(
    /^\/Pages\/(.+)/,
    "./$1"
  );

  highlightActiveLink(currentPath);
});
