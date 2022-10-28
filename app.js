let changingText = document.getElementById("changingText");
let index = 0;
let texts = ["hello_world;", "ralfarios", "typing...", "init..."];

let currText = texts[0];

const chars = [..."!@#$%^&*()qwertyuiopasdfghjklzxcvbnm".split("")];

function spanify(e, ogString) {
  if (!e) return;

  let innerHTML = "";

  for (let i = 0; i < ogString?.length; i++) {
    innerHTML += `<span>${ogString[i]}</span>`;
  }

  e.innerHTML = innerHTML;
}

function randomize(fr, span, spChars) {
  if (fr % 3 !== 0 || span?.innerText === " ") return;

  span.innerText = spChars[Math.floor(Math.random() * spChars.length)];
}

function animate(e, idx, frame, ogString, isForward) {
  if (!e) return;

  const spans = [...e.querySelectorAll("span")];

  if (isForward) {
    if (idx !== ogString.length && spans[idx]) {
      spans[idx].style.display = "unset";

      randomize(frame, spans[idx], chars);

      if (frame % 7 == 0 && frame !== 0) {
        spans[idx].innerText = ogString[idx];
        idx++;
      }
    }
  } else {
    if (idx >= 0 && spans[idx]) {
      randomize(frame, spans[idx], chars);

      if (frame % 3 == 0 && frame !== 0) {
        spans[idx].innerText = "";
        idx--;
      }
    }
  }

  frame++;
  requestAnimationFrame(() => animate(e, idx, frame, ogString, isForward));
}

function animating() {
  spanify(changingText, currText);
  setTimeout(() => animate(changingText, 0, 0, currText, true), 200);
  setTimeout(
    () => animate(changingText, currText?.length - 1, 0, currText, false),
    3000
  );
  setTimeout(() => {
    let idx = index;
    if (idx >= texts.length - 1) {
      index = 0;
    } else {
      index = idx += 1;
    }
    currText = texts[index];
  }, 3750);
}
setInterval(() => animating(), 4000);

animating();
