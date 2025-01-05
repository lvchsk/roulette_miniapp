console.log('<-------WHEEL FILE------->');


const wheel = document.getElementById("rotatingWheel");
const wheel2 = document.getElementById("rotatingWheel2");
const wheel3 = document.getElementById("rotatingWheel3");

let currentDegree = 0;
let currentDegree2 = 0;
let currentDegree3 = 0;

export function rotateWheel(degree) {
  let cum = 360 - degree + 15;

  const duration = 2000;
  const spins = 3;

  const targetDegree1 =
    currentDegree + 360 - (currentDegree % 360) + cum + spins * 360;
  const targetDegree2 =
    currentDegree2 + 360 - (currentDegree2 % 360) + 60 + spins * 360;
  const targetDegree3 =
    currentDegree3 + 360 - (currentDegree3 % 360) + 60 + spins * 360;

  function rotateThird() {
    wheel3.style.transition = `transform ${duration}ms ease-out`;
    wheel3.style.transform = `rotate(${targetDegree3}deg)`;
    setTimeout(() => {
      currentDegree3 = targetDegree3;
      rotateSecond();
    }, duration);
  }

  function rotateSecond() {
    wheel2.style.transition = `transform ${duration}ms ease-out`;
    wheel2.style.transform = `rotate(${targetDegree2}deg)`;
    setTimeout(() => {
      currentDegree2 = targetDegree2;
      rotateFirst();
    }, duration);
  }

  function rotateFirst() {
    wheel.style.transition = `transform ${duration}ms ease-out`;
    wheel.style.transform = `rotate(${targetDegree1}deg)`;
    setTimeout(() => {
      currentDegree = targetDegree1;
    }, duration);
  }

  rotateThird();
}
