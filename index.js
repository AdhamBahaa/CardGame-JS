const gameBoard = document.getElementById("game-board");
const resetBtn = document.getElementById("rst-btn");
const message = document.getElementById("message");

let cards = [];
let flippedCards = [];
let matchedCards = [];
let lockBoard = false;
let timeout;

function createCard(image, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.image = image;
  card.dataset.id = id;

  const front = document.createElement("img");
  front.src = image;
  card.appendChild(front);

  const back = document.createElement("img");
  back.src = "images/back.jpg";
  back.classList.add("back");
  card.appendChild(back);

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function initializeGame() {
  const images = [];
  for (let i = 1; i <= 8; i++) {
    images.push(`images/${i}.png`);
    images.push(`images/${i}.png`);
  }
  shuffleArray(images);

  cards = images.map((image, index) => createCard(image, index));
  gameBoard.innerHTML = "";
  cards.forEach((card) => gameBoard.appendChild(card));
  resetGame();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // swaping algorithm called Fisher-Yates to random elements in an array
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard(card) {
  if (
    card.classList.contains("flipped") ||
    flippedCards.length === 2 ||
    lockBoard
  )
    return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (flippedCards.length === 1) {
      flippedCards[0].classList.remove("flipped");
    }
    flippedCards = [];
  }, 5000);
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.image === secondCard.dataset.image) {
    matchedCards.push(firstCard, secondCard);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      message.textContent = "You Win!";
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

function resetGame() {
  message.textContent = "";
  matchedCards = [];
  initializeGame();
}

resetBtn.addEventListener("click", resetGame);

// Starting the game by invoking the intializeGame function
initializeGame();
