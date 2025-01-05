export function highlightActiveLink(currentPath) {
    console.log("Путь: ", currentPath);

    const links = document.querySelectorAll(".menu_item");
    console.log("HREF:", links[0].lastChild.previousSibling.getAttribute("href"));

    links.forEach((link) => {
      if (link.lastChild.previousSibling.getAttribute("href") === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }