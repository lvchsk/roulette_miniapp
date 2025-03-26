export function inviteFriend(tg, referralLink) {
  if (tg.openContactPicker) {
    tg.openContactPicker({
      message: `Переходи по ссылке, крути колесо фортуны и получай ценные призы и звёзды в Telegram! 🎁\nФортуна на твоей стороне — не упусти момент! 🌟\n${referralLink}`,
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
        alert(error);
      });
  } else {
    const message = encodeURIComponent(
      `Переходи по ссылке, крути колесо фортуны и получай ценные призы и звёзды в Telegram! 🎁\nФортуна на твоей стороне — не упусти момент! 🌟\n`
    );
    window.open(
      `https://t.me/share/url?url=${referralLink}&text=${message}`,
      "_blank"
    );
  }
}
