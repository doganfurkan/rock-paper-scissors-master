localStorage.getItem("score")
  ? (document.getElementById("gameScore").innerHTML = localStorage.score)
  : localStorage.setItem("score", "0");

Array.from(document.getElementsByClassName("gameChoice")).forEach(
  (item, key) => {
    item.addEventListener("click", () => {
      chose(key);
    });
  }
);

function chose(chosen) {
  console.log("chose çalıştı");
  let pcChoice = Math.floor(Math.random() * 3);
  document.getElementById("choose").style.display = "none";
  document.getElementById("chosen").style.display = "flex";
  document.getElementById(
    "yourChoice"
  ).innerHTML = `<div class="picked">YOU PICKED</div>
  <div class="${
    Array.from(document.getElementsByClassName("gameChoice"))[chosen].classList
  }">
    <div class="choiceImg">
      <img src="./images/icon-${
        chosen === 0 ? "paper" : chosen === 1 ? "scissors" : "rock"
      }.svg" alt="rock" />
    </div>
  </div>`;
  document.getElementById(
    "homeChoice"
  ).innerHTML = `<div class="picked">HOUSE PICKED</div>
  <div class="${
    Array.from(document.getElementsByClassName("gameChoice"))[pcChoice]
      .classList
  }">
    <div class="choiceImg">
      <img src="./images/icon-${
        pcChoice === 0 ? "paper" : pcChoice === 1 ? "scissors" : "rock"
      }.svg" alt="rock" />
    </div>
  </div>`;
  setTimeout(() => check(chosen, pcChoice), 1000);
}

function check(player, home) {
  if (player == home) {
    result(0);
  } else if (
    (player == 0 && home == 1) ||
    (player == 1 && home == 2) ||
    (player == 2 && home == 0)
  ) {
    result(2);
  } else if (
    (player == 0 && home == 2) ||
    (player == 1 && home == 0) ||
    (player == 2 && home == 1)
  ) {
    result(1);
  }
}

function result(res) {
  let scr = Number(localStorage.getItem("score"));
  switch (res) {
    case 0:
      document.querySelector("#result>span").innerHTML = "IT'S A TIE";
      break;
    case 1:
      document.querySelector("#yourChoice>.gameChoice").classList.add("winner");
      document.querySelector("#result>span").innerHTML = "YOU WIN";
      localStorage.setItem("score", scr + 1);
      break;
    case 2:
      document.querySelector("#homeChoice>.gameChoice").classList.add("winner");
      document.querySelector("#result>span").innerHTML = "YOU LOSE";
      localStorage.setItem("score", scr - 1);
      break;

    default:
      break;
  }
  document.getElementById("result").style.display = "flex";
  document.getElementById("gameScore").innerHTML = localStorage.score;
}

function again() {
  location.reload();
}

function resetScore() {
  if (window.confirm("Are you sure about resetting the score?")) {
    localStorage.setItem("score", 0);
    document.getElementById("gameScore").innerHTML =
      localStorage.getItem("score");
  }
}

function openRules() {
  document.getElementById("rulesContainer").classList.add("active");
}
function closeRules() {
  document.getElementById("rulesContainer").classList.remove("active");
}
