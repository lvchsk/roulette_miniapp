export async function getData(initData) {
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
      return data;
    }
  } catch (err) {
    console.error("Ошибка при получении данных:", err);
    alert("Ошибка при загрузке данных. Попробуйте позже.");
  } finally {
    loading.style.display = "none";
  }
}

export async function getGift(initData) {
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
      console.log(result);
      console.log('Фриспин получен');
      
    } else {
      console.log(result.message);
      console.log('Фриспин не получен');
      
    }
  } catch (error) {
    console.error("Ошибка при запросе подарка:", error);
    alert("Ошибка при запросе подарка. Попробуйте позже.");
  }
}

export async function updateSpins(initData) {
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
      return result;
    } else {
      console.log(result.message);
      return {
        spins: 0,
        balance: 0
      }
    }
  } catch (error) {
    console.error("Ошибка при уменьшении спинов:", error);
    alert("Ошибка при уменьшении спинов. Попробуйте позже.");
  }
}

export async function fetchTasks(initData) {
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
    return tasks.projects;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
  }
}
