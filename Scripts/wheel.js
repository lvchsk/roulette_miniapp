const wheel = document.getElementById("rotatingWheel");

let currentDegree = 0;

export function rotateWheel(degree) {
  const duration = 3000;
  const spins = 3;

  const targetDegree1 =
    currentDegree + 360 - (currentDegree % 360) + degree + spins * 360;

  function rotate() {
    wheel.style.transition = `transform ${duration}ms ease-out`;
    wheel.style.transform = `rotate(${targetDegree1}deg)`;
    setTimeout(() => {
      currentDegree = targetDegree1;
    }, duration);
  }

  rotate();
}
