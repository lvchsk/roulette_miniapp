// Модалка welcome
const welcomeModal = document.getElementById("welcomeModal");
const closeWelcomeModalButton = document.getElementById(
  "closeWelcomeModalButton"
);

closeWelcomeModalButton.addEventListener("pointerdown", () => {
  welcomeModal.style.visibility = "hidden";
  welcomeModal.style.opacity = "0";
});

welcomeModal.addEventListener("pointerdown", (event) => {
  if (event.target === welcomeModal) {
    welcomeModal.style.visibility = "hidden";
    welcomeModal.style.opacity = "0";
  }
});

export function openWelcomeModal(spent) {
  if (!spent) {
    welcomeModal.style.visibility = "visible";
    welcomeModal.style.opacity = "1";
  } else {
    return
  }
}

// Модалка подарка
const giftModal = document.getElementById("giftModal");
const closeGiftModalButton = document.getElementById("closeGiftModalButton");

closeGiftModalButton.addEventListener("pointerdown", () => {
  giftModal.style.visibility = "hidden";
  giftModal.style.opacity = "0";
});

giftModal.addEventListener("pointerdown", (event) => {
  if (event.target === giftModal) {
    giftModal.style.visibility = "hidden";
    giftModal.style.opacity = "0";
  }
});

function openGiftModal() {
  giftModal.style.visibility = "visible";
  giftModal.style.opacity = "1";
}

const giftButton = document.getElementById("giftButton");
const giftImg = document.getElementById("gift-img");

giftButton.addEventListener("pointerdown", openGiftModal);
giftImg.addEventListener("pointerdown", openGiftModal);

// Модалка призов
const prizeModal = document.getElementById("prizeModal");
const closePrizeModalButton = document.getElementById("closePrizeModalButton");
const modalContent = document.getElementById("modalContent");

closePrizeModalButton.addEventListener("pointerdown", () => {
  prizeModal.style.visibility = "hidden";
  prizeModal.style.opacity = "0";
});

prizeModal.addEventListener("pointerdown", (event) => {
  if (event.target === prizeModal) {
    prizeModal.style.visibility = "hidden";
    prizeModal.style.opacity = "0";
  }
});

export function prizeModals(prize, link, actualBalance) {
  if (
    [
      "iphone",
      "5.000",
      "star10",
      "star50",
      "star100",
      "star300"
      // "spin",
    ].includes(prize)
  ) {
    setTimeout(() => {
      const prizeButton = document.getElementById("prizeModalButton");
      const balanceText = document.getElementById('balance');
      console.log(modalContent);

      if (prize === "iphone") {
        modalContent.classList.remove("prize5000");
        modalContent.classList.remove("prize500");
        modalContent.classList.remove("star10");
        modalContent.classList.remove("star50");
        modalContent.classList.remove("star100");
        modalContent.classList.remove("star300");
        modalContent.classList.remove("spin");
        modalContent.classList.add("iphone");
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      if (prize === "5.000") {
        modalContent.classList.remove("prize5000");
        modalContent.classList.remove("prize500");
        modalContent.classList.remove("star10");
        modalContent.classList.remove("star50");
        modalContent.classList.remove("star100");
        modalContent.classList.remove("star300");
        modalContent.classList.remove("spin");
        modalContent.classList.add("prize5000");
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      if (prize === "star10") {
        modalContent.classList.remove("prize5000");
        modalContent.classList.remove("prize500");
        modalContent.classList.remove("star50");
        modalContent.classList.remove("star100");
        modalContent.classList.remove("star300");
        modalContent.classList.remove("spin");
        modalContent.classList.add("star10");
        balanceText.innerText = `Баланс: ${actualBalance + 10}⭐️`;
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      if (prize === "star50") {
        modalContent.classList.remove("prize5000");
        modalContent.classList.remove("prize500");
        modalContent.classList.remove("star10");
        modalContent.classList.remove("star50");
        modalContent.classList.remove("star100");
        modalContent.classList.remove("star300");
        modalContent.classList.remove("spin");
        modalContent.classList.add("star50");
        balanceText.innerText = `Баланс: ${actualBalance + 50}⭐️`;
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      if (prize === "star100") {
        modalContent.classList.remove("prize5000");
        modalContent.classList.remove("prize500");
        modalContent.classList.remove("star10");
        modalContent.classList.remove("star50");
        modalContent.classList.remove("star100");
        modalContent.classList.remove("star300");
        modalContent.classList.remove("spin");
        modalContent.classList.add("star100");
        balanceText.innerText = `Баланс: ${actualBalance + 100}⭐️`;
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      if (prize === "star300") {
        modalContent.classList.remove("prize5000");
        modalContent.classList.remove("prize500");
        modalContent.classList.remove("star10");
        modalContent.classList.remove("star50");
        modalContent.classList.remove("star100");
        modalContent.classList.remove("star300");
        modalContent.classList.remove("spin");
        modalContent.classList.add("star300");
        balanceText.innerText = `Баланс: ${actualBalance + 300}⭐️`;
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      // if (prize === "spin") {
      //   modalContent.classList.remove("prize5000");
      //   modalContent.classList.remove("prize500");
      //   modalContent.classList.remove("star10");
      //   modalContent.classList.remove("star50");
      //   modalContent.classList.remove("star100");
      //   modalContent.classList.remove("star300");
      //   modalContent.classList.remove("spin");
      //   modalContent.classList.add("spin");
      //   prizeButton.href = link;
      //   prizeButton.style.display = "block";
      // }
      prizeModal.style.visibility = "visible";
      prizeModal.style.opacity = "1";
    }, 4500);
  }
}

// Модалка предупреждения

const warningModal = document.getElementById('warningModal');
const closeWarningModalButton = document.getElementById("closeWarningModalButton");

closeWarningModalButton.addEventListener("pointerdown", () => {
  warningModal.style.visibility = "hidden";
  warningModal.style.opacity = "0";
});

warningModal.addEventListener("pointerdown", (event) => {
  if (event.target === warningModal) {
    warningModal.style.visibility = "hidden";
    warningModal.style.opacity = "0";
  }
});

export function openWarningModal() {
    warningModal.style.visibility = "visible";
    warningModal.style.opacity = "1";
}
