window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  tg.expand();

  const giftCooldown = 24 * 60 * 60 * 1000; // 24 часа

  const initData = tg.initData;

  // const initData =
  //   "query_id=AAFnEKlRAAAAAGcQqVFuPynM&user=%7B%22id%22%3A1370034279%2C%22first_name%22%3A%22PUG%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22mad_pug%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FC4P153sbF5ZKQ0bXj61fro_kpL2AtsdVnAeOQ2veP_Y.svg%22%7D&auth_date=1734346396&signature=tkzPFjA-_u5sC8Jn29G8iy3729vIL8fyHHyALY4aVmsnqtNXcCalZzS4GmnglECiEcO1SdHCgFeJDUHyFiPiCg&hash";

  const loading = document.getElementById("loading");
  loading.style.display = "flex";

  let spins = 0;
  let referralLink = "";
  let nextGiftTime;

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

  function getSpinsText(spins) {
    const remainder10 = spins % 10;
    const remainder100 = spins % 100;
  
    if (remainder100 >= 11 && remainder100 <= 19) {
      return `${spins} Вращений`;
    }
  
    if (remainder10 === 1) {
      return `${spins} Вращение`;
    }
  
    if (remainder10 >= 2 && remainder10 <= 4) {
      return `${spins} Вращения`;
    }
  
    return `${spins} Вращений`;
  }
  

  function updateSpinsDisplay() {
    document.getElementById("spinsRemaining").innerText = getSpinsText(spins);
  }

  updateSpinsDisplay();

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

  // Функция вращения

  const wheel = document.getElementById("rotatingWheel");
  const wheel2 = document.getElementById("rotatingWheel2");
  const wheel3 = document.getElementById("rotatingWheel3");

  let currentDegree = 0;
  let currentDegree2 = 0;
  let currentDegree3 = 0;

  // function rotateWheel(degree) {
  //   let cum = 360 - degree + 30;
  //   currentDegree += 360 - (currentDegree % 360) + cum;
  //   currentDegree2 += 360 - (currentDegree2 % 360) + 60;
  //   currentDegree3 += 360 - (currentDegree3 % 360) + 60;

  //   function rotateFirst() {
  //     wheel.style.transform = `rotate(${currentDegree}deg)`;
  //   }
  //   function rotateSecond() {
  //     wheel2.style.transform = `rotate(${currentDegree2}deg)`;
  //   }
  //   function rotateThird() {
  //     wheel3.style.transform = `rotate(${currentDegree3}deg)`;
  //   }
  //   setTimeout(rotateFirst, 4000);
  //   setTimeout(rotateSecond, 2000);
  //   setTimeout(rotateThird, 200);
  // }
  
  function rotateWheel(degree) {
    let cum = 360 - degree + 15;

    const duration = 2000;
    const spins = 3;

    const targetDegree1 = currentDegree + 360 - (currentDegree % 360) + cum + (spins * 360);
    const targetDegree2 = currentDegree2 + 360 - (currentDegree2 % 360) + 60 + (spins * 360);
    const targetDegree3 = currentDegree3 + 360 - (currentDegree3 % 360) + 60 + (spins * 360);
  
    function rotateThird() {
      wheel3.style.transition = `transform ${duration}ms ease-out`;
      wheel3.style.transform = `rotate(${targetDegree3}deg)`;
      setTimeout(() => {
        currentDegree3 = targetDegree3;
        rotateSecond();
      }, duration);
    }

    function rotateSecond() {
      wheel2.style.transition = `transform ${duration}ms ease-out`;
      wheel2.style.transform = `rotate(${targetDegree2}deg)`;
      setTimeout(() => {
        currentDegree2 = targetDegree2;
        rotateFirst();
      }, duration);
    }
  
    function rotateFirst() {
      wheel.style.transition = `transform ${duration}ms ease-out`;
      wheel.style.transform = `rotate(${targetDegree1}deg)`;
      setTimeout(() => {
        currentDegree = targetDegree1;
      }, duration);
    }
  
    rotateThird();
  }
  
  

  const btnMinus = document.getElementById("btnMinus");

  // Модалка призов
  const prizeModal = document.getElementById("prizeModal");
  const closePrizeModalButton = document.getElementById(
    "closePrizeModalButton"
  );

  closePrizeModalButton.addEventListener("click", () => {
    prizeModal.style.display = "none";
  });

  prizeModal.addEventListener("click", (event) => {
    if (event.target === prizeModal) {
      prizeModal.style.display = "none";
    }
  });

  // Модалка подарка
  const giftModal = document.getElementById("giftModal");
  const closeGiftModalButton = document.getElementById("closeGiftModalButton");

  closeGiftModalButton.addEventListener("click", () => {
    giftModal.style.display = "none";
  });

  giftModal.addEventListener("click", (event) => {
    if (event.target === giftModal) {
      giftModal.style.display = "none";
    }
  });

  
  function openGiftModal() {
    giftModal.style.display = "flex";
  }
  
  const giftButton = document.getElementById("giftButton");
  const giftImg = document.getElementById('gift-img');


  // giftButton.addEventListener("click", openGiftModal);
  giftButton.addEventListener("touchstart", openGiftModal);
  giftImg.addEventListener('touchstart', openGiftModal)


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
        // if (spins === 0) return;
        spentSpins = result.spentSpins;
        updateSpinsDisplay();

        // Обновление отображения приза
        const prize = result.prize.value || "";
        const degree = result.prize.degree;
        console.log(`Приз: ${prize}, Угол: ${degree}`);

        // Прокрутка
        rotateWheel(degree);

        if (["iphone", "5.000", "500"].includes(prize)) {
          setTimeout(() => {
            const prizeButton = document.getElementById('prizeModalButton');
            
            if(prize === 'iphone') {   
              prizeModal.firstChild.nextSibling.classList.remove('prize5000');
              prizeModal.firstChild.nextSibling.classList.remove('500');
              prizeModal.firstChild.nextSibling.classList.add('iphone');
              prizeButton.href = 'https://onesecgo.ru/stream/iphone_wbprize';
            }
            if(prize === '5.000') {
              prizeModal.firstChild.nextSibling.classList.remove('iphone');
              prizeModal.firstChild.nextSibling.classList.remove('500');
              prizeModal.firstChild.nextSibling.classList.add('prize5000');
              prizeButton.href = 'https://onesecgo.ru/stream/5000_wbprize'
            }
            if(prize === '500') {
              prizeModal.firstChild.nextSibling.classList.remove('iphone');
              prizeModal.firstChild.nextSibling.classList.remove('prize5000');
              prizeModal.firstChild.nextSibling.classList.add('prize500');
              prizeButton.style.display = 'none';
            }
            prizeModal.style.display = "flex";
          }, 7000);
        }
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

  function highlightActiveLink() {
    const currentPath = window.location.pathname.replace(
      /^\/Pages\/(.+)/,
      "./$1"
    );
    console.log("Путь: ", currentPath);

    const links = document.querySelectorAll(".menu_item");
    console.log("HREF:", links[0].lastChild.previousSibling.getAttribute("href"));

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
