export function updateSpinsDisplay(spins) {
  document.getElementById("spinsRemaining").innerText = getSpinsText(spins);
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

export async function copyText(textToCopy, notification) {
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
}
