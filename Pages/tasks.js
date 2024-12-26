window.addEventListener("load", async () => {
  const tg = window.Telegram.WebApp;
  // const initData = tg.initData;
  const initData =
       "query_id=AAFnEKlRAAAAAGcQqVFuPynM&user=%7B%22id%22%3A1370034279%2C%22first_name%22%3A%22PUG%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22mad_pug%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FC4P153sbF5ZKQ0bXj61fro_kpL2AtsdVnAeOQ2veP_Y.svg%22%7D&auth_date=1734346396&signature=tkzPFjA-_u5sC8Jn29G8iy3729vIL8fyHHyALY4aVmsnqtNXcCalZzS4GmnglECiEcO1SdHCgFeJDUHyFiPiCg&hash";

  tg.expand();

  const container = document.getElementById('container');
  container.style.overflow = 'auto';
  container.style.height = '80vh';
  container.style.position = 'absolute';


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

      // Преобразуем ответ в JSON
      const tasks = await response.json();
      console.log(tasks);
      

      // Вызываем функцию для отображения задач
      displayTasks(tasks.projects);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  }

  function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        // Создаем контейнер для карточки
        const card = document.createElement("div");
        card.classList.add("task-card");

        // Название задачи
        const taskName = document.createElement("h3");
        taskName.textContent = task.name;
        card.appendChild(taskName);

        // Описание задачи
        const taskDescription = document.createElement("p");
        taskDescription.textContent = task.description;
        card.appendChild(taskDescription);

        // Кнопка действия
        const taskButton = document.createElement("a");
        taskButton.href = task.link;
        taskButton.textContent = task.buttonText;
        taskButton.classList.add("task-button");
        card.appendChild(taskButton);

        // Добавляем карточку в список
        taskList.appendChild(card);
    });
}

  fetchTasks();
  //   displayTasks(tasks);

  function highlightActiveLink() {
    const currentPath = window.location.pathname.replace(/^\/Pages\/(.+)/, './$1');
    // console.log('Путь: ', currentPath);

    const links = document.querySelectorAll(".menu a");
    // console.log('HREF:', links[0].getAttribute("href"));

    links.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  highlightActiveLink();
});
