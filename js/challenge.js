// Activating strict mode
"use strict";

// Defining variables to reference elements in the HTML document
let seconds = 0;
let playing = true;
let interval;

const counter = document.getElementById("counter");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const pause = document.getElementById("pause");
const heart = document.getElementById("heart");
const commentForm = document.querySelector("form");

// Function to increase and update the displayed timer value
function timerSet() {
  seconds++;
  counter.textContent = seconds;
}

// Function to start the timer every 1000 miliseconds
function startTimer() {
  interval = setInterval(timerSet, 1000);
}

// Initiating the timer
startTimer();

// Event listeners to increment or decrement the time value
plus.addEventListener("click", () => {
  seconds++;
  counter.textContent = seconds;
});

minus.addEventListener("click", () => {
  seconds--;
  counter.textContent = seconds;
});

// Event listener for the heart element
heart.addEventListener("click", () => {
  const num = parseInt(counter.innerText);
  const likesList = document.querySelector(".likes");
  const existingLike = likesList.querySelector(`[data-num="${num}"]`);

  if (existingLike) {
    const likesSpan = existingLike.querySelector("span");
    let likesCount = parseInt(likesSpan.textContent); // Update the text content of the span to reflect the incremented like count
    likesSpan.textContent = likesCount + 1;
  } else {
    const newLike = document.createElement("li");
    newLike.setAttribute("data-num", num);
    newLike.innerHTML = `${num} has been liked <span>1</span> time`;
    likesList.appendChild(newLike);
  }
});

// Event listener for the pause element
pause.addEventListener("click", () => {
  if (playing) {
    clearInterval(interval);
    pause.textContent = "resume";
  } else {
    startTimer();
    pause.textContent = "pause";
  }
  playing = !playing;
  [plus, minus, heart, commentForm.querySelector("button")].forEach(
    (btn) => {
      btn.disabled = !playing;
    }
  );
});

// event listener for the submit event on the commentForm element
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const commentInput = commentForm.querySelector("input#comment-input").value;
  const commentsList = document.querySelector(".comments");
  const commentParagraph = document.createElement("p");
  commentParagraph.textContent = commentInput;
  commentsList.appendChild(commentParagraph);
});