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

//add up all card values
function calculateTotal(hand) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const valueArray = hand.map((c) => c.value);
  valueArray.map((val, i) => {
    if (val === "J" || val === "Q" || val === "K") {
      valueArray[i] = 10;
    }
  });
  return valueArray.reduce(reducer);
}

//render an element with player and total
function renderTotal(name, hand, total) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("counter");
  newDiv.appendChild(
    document.createTextNode(name + "'s Hand - Total: " + total)
  );
  newDiv.id = name + "Total";
  const currentDiv = document.querySelector(".game");
  document.body.insertBefore(newDiv, currentDiv);
}

function renderHand(name, hand) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("hand");
  hand.map((c) => {
    const card = document.createElement("div");
    card.appendChild(document.createTextNode(c.value + c.suit));
    card.classList.add("card");
    newDiv.appendChild(card);
  });
  newDiv.id = name + "Hand";

  if (name === "Computer") {
    newDiv.childNodes[0].classList.add("cover");
    newDiv.childNodes[0].classList.remove("card");
  }
  const currentDiv = document.querySelector(".game");
  document.body.insertBefore(newDiv, currentDiv);
}

function showComputerHand(deck, userHand, computerHand) {
  while (calculateTotal(computerHand) < 19) {
    const next = deck.shift();
    deck = arrayRemove(deck, [next]);
    const card = document.createElement("div");
    card.appendChild(document.createTextNode(next.value + next.suit));
    card.classList.add("card");
    document.getElementById("ComputerHand").appendChild(card);
    if (next.value === "A") {
      if (calculateTotal(computerHand) > 10) {
        next.value = 1;
      } else {
        next.value = 11;
      }
    }
    computerHand = [next, ...computerHand];

    //css change for hidden card
    const hiddenCard = document.getElementById("ComputerHand");
    hiddenCard.childNodes[0].classList.remove("cover");
    hiddenCard.childNodes[0].classList.add("card");

    const total = document.getElementById("ComputerTotal");
    total.replaceChild(
      document.createTextNode(
        "Computer's Hand - Total: " + calculateTotal(computerHand)
      ),
      total.childNodes[0]
    );
  }
  determineWinner(calculateTotal(userHand), calculateTotal(computerHand));
}

function determineWinner(userTotal, computerTotal) {
  let status = "";
  if (userTotal > 21) {
    status = "Player lost! (Busted)";
  } else if (
    computerTotal > 21 ||
    (computerTotal <= 21 && userTotal <= 21 && userTotal > computerTotal)
  ) {
    status = "Player won!";
  } else if (
    computerTotal <= 21 &&
    userTotal <= 21 &&
    userTotal < computerTotal
  ) {
    status = "Computer won!";
  } else if (computerTotal === userTotal) {
    status = "It's a tie!";
  }
  const hitstand = document.getElementById("HitStand");
  hitstand.addEventListener("click", function () {
    hitstand.classList.add("hidden");
    hitstand.classList.remove("hand");
  });
  const newDiv = document.createElement("div");
  newDiv.classList.add("status");
  newDiv.appendChild(document.createTextNode(status));
  const currentDiv = document.querySelector(".game");
  document.body.insertBefore(newDiv, currentDiv);
}

function renderHitStand(deck, userHand, computerHand) {
  //wrapper div
  const newDiv = document.createElement("div");
  newDiv.classList.add("hand");

  //hit
  const hitButton = document.createElement("button");
  hitButton.classList.add("button");
  const hitText = document.createTextNode("Hit");
  hitButton.appendChild(hitText);
  newDiv.appendChild(hitButton);
  newDiv.id = "HitStand";

  hitButton.addEventListener("click", function () {
    const next = deck.shift();
    deck = arrayRemove(deck, [next]);
    const card = document.createElement("div");
    card.appendChild(document.createTextNode(next.value + next.suit));
    card.classList.add("card");
    document.getElementById("UserHand").appendChild(card);
    if (next.value === "A") {
      if (calculateTotal(userHand) > 10) {
        next.value = 1;
      } else {
        next.value = 11;
      }
    }
    userHand = [next, ...userHand];

    const total = document.getElementById("UserTotal");
    total.replaceChild(
      document.createTextNode(
        "User's Hand - Total: " + calculateTotal(userHand)
      ),
      total.childNodes[0]
    );

    if (calculateTotal(userHand) > 21) {
      //css change for hidden card
      const hiddenCard = document.getElementById("ComputerHand");
      hiddenCard.childNodes[0].classList.remove("cover");
      hiddenCard.childNodes[0].classList.add("card");
      const total = document.getElementById("ComputerTotal");
      total.replaceChild(
        document.createTextNode(
          "Computer's Hand - Total: " + calculateTotal(computerHand)
        ),
        total.childNodes[0]
      );
      determineWinner(calculateTotal(userHand), calculateTotal(computerHand));
    }
  });

  //stand
  const standButton = document.createElement("button");
  const standText = document.createTextNode("Stand");
  standButton.appendChild(standText);
  newDiv.appendChild(standButton);

  standButton.addEventListener("click", function () {
    showComputerHand(deck, userHand, computerHand);
  });

  const currentDiv = document.querySelector(".game");
  document.body.insertBefore(newDiv, currentDiv);
}

function renderGame(deck, user, computer) {
  document.body.onload = renderTotal("Computer", computer, "?");
  document.body.onload = renderHand("Computer", computer);
  document.body.onload = renderTotal("User", user, calculateTotal(user));
  document.body.onload = renderHand("User", user);
  document.body.onload = renderHitStand(deck, user, computer);
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
    const c = remainingCards.filter((card) => card.value == i);
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
      if (index % 2 === 0) {
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
  renderGame(remainingCards, userHand, computerHand);
}

function main() {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    const userInput = this[0].value;
    dealCards(userInput);
  });

  document.querySelector(".playBtn").addEventListener("click", function () {
    form.classList.add("hidden");
  });
}
document.addEventListener("DOMContentLoaded", main);
