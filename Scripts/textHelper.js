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
  // Вспомогательная функция для fallback
  function fallbackCopyText(text) {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch (error) {
      console.error("Fallback copy failed:", error);
      return false;
    }
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToCopy);
    } else {
      const result = fallbackCopyText(textToCopy);
      if (!result) throw new Error("Fallback copy failed");
    }
    notification.textContent = "Ссылка скопирована!";
  } catch (err) {
    console.error("Ошибка при копировании ссылки:", err);
    const result = fallbackCopyText(textToCopy);
    if (result) {
      notification.textContent = "Ссылка скопирована!";
    } else {
      notification.textContent = "Ошибка при копировании.";
    }
  }
  notification.classList.add("show");
  notification.classList.remove("hidden");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}