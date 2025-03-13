export function inviteFriend(tg, referralLink) {
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
            // alert("Не удалось открыть список контактов.");
            alert(error);
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
}
