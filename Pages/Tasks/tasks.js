import { highlightActiveLink } from "../../Scripts/highlightLink.js";

window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;

  tg.expand();

  const container = document.getElementById("container");
  // container.style.overflow = "auto";
  // container.style.height = "80vh";
  container.style.position = "absolute";

  async function fetchTasks() {
    try {
      const response = await fetch("https://bestx.cam/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData }),
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const tasks = await response.json();

      displayTasks(tasks.projects);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  }

  function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.classList.add("task-card");

      const iconContainer = document.createElement("span");
      iconContainer.classList.add("icon_container");

      const taskIcon = document.createElement("img");
      taskIcon.src = "../../Photos/gift_icon.svg";
      iconContainer.appendChild(taskIcon)

      card.appendChild(iconContainer)

      const descriptionContainer = document.createElement('div');
      descriptionContainer.classList.add('task_description');

      const taskName = document.createElement("h6");
      taskName.textContent = task.name;
      descriptionContainer.appendChild(taskName);

      const taskDescription = document.createElement("p");
      taskDescription.textContent = task.description;
      descriptionContainer.appendChild(taskDescription);

      card.appendChild(descriptionContainer)

      const taskButton = document.createElement("a");
      taskButton.href = task.link;
      taskButton.target = "_blank";
      taskButton.textContent = 'Выполнить';
      taskButton.classList.add("task-button");
      card.appendChild(taskButton);

      taskList.appendChild(card);
    });
  }

  fetchTasks();

  const currentPath = window.location.pathname.replace(
    /^\/Pages\/.+\/(.+)/,
    "./$1"
  );

  highlightActiveLink(currentPath);
});
