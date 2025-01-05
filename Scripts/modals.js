console.log('<-------MODALS FILE------>');


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
const giftImg = document.getElementById("gift-img");

// giftButton.addEventListener("click", openGiftModal);
giftButton.addEventListener("touchstart", openGiftModal);
giftImg.addEventListener("touchstart", openGiftModal);

// Модалка призов
const prizeModal = document.getElementById("prizeModal");
const closePrizeModalButton = document.getElementById("closePrizeModalButton");
const modalContent = document.getElementById('modalContent');

closePrizeModalButton.addEventListener("click", () => {
  prizeModal.style.display = "none";
});

prizeModal.addEventListener("click", (event) => {
  if (event.target === prizeModal) {
    prizeModal.style.display = "none";
  }
});

export function prizeModals(prize) {
    if (["iphone", "5.000", "500"].includes(prize)) {
        setTimeout(() => {
          const prizeButton = document.getElementById('prizeModalButton');
          console.log(modalContent);
          
          if(prize === 'iphone') {   
            modalContent.classList.remove('prize5000');
            modalContent.classList.remove('500');
            modalContent.classList.add('iphone');
            prizeButton.href = 'https://onesecgo.ru/stream/iphone_wbprize';
          }
          if(prize === '5.000') {
            modalContent.classList.remove('iphone');
            modalContent.classList.remove('500');
            modalContent.classList.add('prize5000');
            prizeButton.href = 'https://onesecgo.ru/stream/5000_wbprize'
          }
          if(prize === '500') {
            modalContent.classList.remove('iphone');
            modalContent.classList.remove('prize5000');
            modalContent.classList.add('prize500');
            prizeButton.style.display = 'none';
          }
          prizeModal.style.display = "flex";
        }, 7000);
      }
}
