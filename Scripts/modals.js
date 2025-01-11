// Модалка подарка
const giftModal = document.getElementById("giftModal");
const closeGiftModalButton = document.getElementById("closeGiftModalButton");

closeGiftModalButton.addEventListener("pointerdown", () => {
  // giftModal.style.display = "none";
  giftModal.style.visibility = "hidden";
  giftModal.style.opacity = "0";
});

giftModal.addEventListener("pointerdown", (event) => {
  if (event.target === giftModal) {
    // giftModal.style.display = "none";
    giftModal.style.visibility = "hidden";
    giftModal.style.opacity = "0";
  }
});

function openGiftModal() {
  giftModal.style.visibility = "visible";
  giftModal.style.opacity = "1";
  // giftModal.style.display = "flex";
}

const giftButton = document.getElementById("giftButton");
const giftImg = document.getElementById("gift-img");

// giftButton.addEventListener("click", openGiftModal);
giftButton.addEventListener("pointerdown", openGiftModal);
giftImg.addEventListener("pointerdown", openGiftModal);

// Модалка призов
const prizeModal = document.getElementById("prizeModal");
const closePrizeModalButton = document.getElementById("closePrizeModalButton");
const modalContent = document.getElementById("modalContent");

closePrizeModalButton.addEventListener("pointerdown", () => {
  prizeModal.style.visibility = "hidden";
  prizeModal.style.opacity = "0";
  // prizeModal.style.display = "none";
});

prizeModal.addEventListener("pointerdown", (event) => {
  if (event.target === prizeModal) {
    prizeModal.style.visibility = "hidden";
    prizeModal.style.opacity = "0";
    // prizeModal.style.display = "none";
  }
});

export function prizeModals(prize, link) {
  if (["iphone", "5.000", "500"].includes(prize)) {
    setTimeout(() => {
      const prizeButton = document.getElementById("prizeModalButton");
      console.log(modalContent);

      if (prize === "iphone") {
        modalContent.classList.remove("prize5000");
        modalContent.classList.remove("prize500");
        modalContent.classList.add("iphone");
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      if (prize === "5.000") {
        modalContent.classList.remove("iphone");
        modalContent.classList.remove("prize500");
        modalContent.classList.add("prize5000");
        prizeButton.href = link;
        prizeButton.style.display = "block";
      }
      if (prize === "500") {
        modalContent.classList.remove("iphone");
        modalContent.classList.remove("prize5000");
        modalContent.classList.add("prize500");
        prizeButton.style.display = "none";
      }
      prizeModal.style.visibility = "visible";
      prizeModal.style.opacity = "1";
      // prizeModal.style.display = "flex";
    }, 9500);
  }
}
