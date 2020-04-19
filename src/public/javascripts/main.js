function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function arrayRemove(arr, values) {
  return arr.filter((ele) => {
    if (!values.includes(ele)) {
      return ele;
    }
  });
}

function renderHand(hand) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("hand");
  hand.map((c) => {
    content = document.createTextNode(c.value + c.suit);
    const card = document.createElement("div");
    card.appendChild(content);
    card.classList.add("card");
    newDiv.appendChild(card);
  });
  const currentDiv = document.querySelector(".game");
  document.body.insertBefore(newDiv, currentDiv);
}

function renderGame(user, computer) {
  document.body.onload = renderHand(computer);
  document.body.onload = renderHand(user);
}

function dealCards(input) {
  const deck = [
    { suit: "❤️", value: 2 },
    { suit: "❤️", value: 3 },
    { suit: "❤️", value: 4 },
    { suit: "❤️", value: 5 },
    { suit: "❤️", value: 6 },
    { suit: "❤️", value: 7 },
    { suit: "❤️", value: 8 },
    { suit: "❤️", value: 9 },
    { suit: "❤️", value: 10 },
    { suit: "❤️", value: "J" },
    { suit: "❤️", value: "Q" },
    { suit: "❤️", value: "K" },
    { suit: "❤️", value: "A" },
    { suit: "♦️", value: 2 },
    { suit: "♦️", value: 3 },
    { suit: "♦️", value: 4 },
    { suit: "♦️", value: 5 },
    { suit: "♦️", value: 6 },
    { suit: "♦️", value: 7 },
    { suit: "♦️", value: 8 },
    { suit: "♦️", value: 9 },
    { suit: "♦️", value: 10 },
    { suit: "♦️", value: "J" },
    { suit: "♦️", value: "Q" },
    { suit: "♦️", value: "K" },
    { suit: "♦️", value: "A" },
    { suit: "♣️", value: 2 },
    { suit: "♣️", value: 3 },
    { suit: "♣️", value: 4 },
    { suit: "♣️", value: 5 },
    { suit: "♣️", value: 6 },
    { suit: "♣️", value: 7 },
    { suit: "♣️", value: 8 },
    { suit: "♣️", value: 9 },
    { suit: "♣️", value: 10 },
    { suit: "♣️", value: "J" },
    { suit: "♣️", value: "Q" },
    { suit: "♣️", value: "K" },
    { suit: "♣️", value: "A" },
    { suit: "♠️", value: 2 },
    { suit: "♠️", value: 3 },
    { suit: "♠️", value: 4 },
    { suit: "♠️", value: 5 },
    { suit: "♠️", value: 6 },
    { suit: "♠️", value: 7 },
    { suit: "♠️", value: 8 },
    { suit: "♠️", value: 9 },
    { suit: "♠️", value: 10 },
    { suit: "♠️", value: "J" },
    { suit: "♠️", value: "Q" },
    { suit: "♠️", value: "K" },
    { suit: "♠️", value: "A" },
  ];
  shuffle(deck);
  //grab user input cards first
  let remainingCards = deck;
  const startingCards = new Array();
  input.split(",").forEach((i) => {
    let c = remainingCards.filter((card) => card.value == i);
    startingCards.push(c[0]);
    remainingCards = arrayRemove(remainingCards, startingCards);
  });
  //return array without those cards anymore
  remainingCards = arrayRemove(remainingCards, startingCards);

  //deal
  const userHand = new Array();
  const computerHand = new Array();
  startingCards.map((card, index) => {
    if (index < 4) {
      if (index % 2 == 0) {
        computerHand.push(card);
      } else {
        userHand.push(card);
      }
    } else {
      shuffle(remainingCards);
      remainingCards = [
        ...startingCards.slice(index - 1, startingCards.length),
        ...arrayRemove(remainingCards, startingCards),
      ];
    }
  });
  renderGame(userHand, computerHand);
}

function main() {
  const form = document.querySelector("form");

  form.addEventListener("click", function (evt) {
    evt.preventDefault();
    const userInput = this[0].value;
    dealCards(userInput);
  });

  document.querySelector(".playBtn").addEventListener("click", function (evt) {
    form.classList.add("hidden");
  });
}
document.addEventListener("DOMContentLoaded", main);
