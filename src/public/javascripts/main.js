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
    if (val === "J") {
      valueArray[i] = 11;
    } else if (val === "Q") {
      valueArray[i] = 12;
    } else if (val === "K") {
      valueArray[i] = 13;
    } else if (val === "A") {
      valueArray[i] = 1;
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
    console.log(newDiv.childNodes[0].childNodes[0]);
  }
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

  handleHit(hitButton, deck, "User", userHand, computerHand);

  //stand
  const standButton = document.createElement("button");
  const standText = document.createTextNode("Stand");
  standButton.appendChild(standText);
  newDiv.appendChild(standButton);

  handleStand(standButton, deck, userHand, computerHand);

  const currentDiv = document.querySelector(".game");
  document.body.insertBefore(newDiv, currentDiv);
}

function handleHit(button, deck, name, userHand, computerHand) {
  button.addEventListener("click", function (evt) {
    const next = deck.pop();
    deck = arrayRemove(deck, [next]);
    const card = document.createElement("div");
    card.appendChild(document.createTextNode(next.value + next.suit));
    card.classList.add("card");
    document.getElementById("UserHand").appendChild(card);
    userHand = [next, ...userHand];

    const total = document.getElementById("UserTotal");
    total.replaceChild(
      document.createTextNode(
        "User's Hand - Total: " + calculateTotal(userHand)
      ),
      total.childNodes[0]
    );

    if (calculateTotal(userHand) > 21) {
      determineWinner("hit", userHand, computerHand);
    }
  });
}

function handleStand(standButton, deck, userHand, computerHand) {
  standButton.addEventListener("click", function (evt) {
    while (calculateTotal(computerHand) < 19) {
      const next = deck.pop();
      deck = arrayRemove(deck, [next]);
      const card = document.createElement("div");
      card.appendChild(document.createTextNode(next.value + next.suit));
      card.classList.add("card");
      document.getElementById("ComputerHand").appendChild(card);
      computerHand = [next, ...computerHand];

      const total = document.getElementById("ComputerTotal");
      total.replaceChild(
        document.createTextNode(
          "Computer's Hand - Total: " + calculateTotal(computerHand)
        ),
        total.childNodes[0]
      );
    }
    determineWinner("stand", userHand, computerHand);
  });
}

function determineWinner(action, userHand, computerHand) {
  userHand = calculateTotal(userHand);
  computerHand = calculateTotal(computerHand);
  let status = "";
  if (action === "hit" && userHand > 21) {
    status = "Player lost! (Busted)";
  } else if (
    computerHand > 21 ||
    (action === "stand" &&
      computerHand < 21 &&
      userHand < 21 &&
      userHand > computerHand)
  ) {
    status = "Player won!";
  } else if (computerHand < 21 && userHand < 21 && userHand < computerHand) {
    status = "Computer won!";
  }
  const hitstand = document.getElementById("HitStand");
  hitstand.addEventListener("click", function (evt) {
    hitstand.classList.add("hidden");
    hitstand.classList.remove("hand");
  });
  const newDiv = document.createElement("div");
  newDiv.classList.add("status");
  newDiv.appendChild(document.createTextNode(status));
  const currentDiv = document.querySelector(".game");
  document.body.insertBefore(newDiv, currentDiv);

  //reset button
  // const resetButton = document.createElement("button");
  // resetButton.id = "resetButton";
  // resetButton.appendChild(document.createTextNode("reset"));
  // document.body.insertBefore(resetButton, currentDiv);
}

// function handleReset() {
//   const resetButton = document.getElementById("resetButton");
//   resetButton.addEventListener("click", function (evt) {
//     main();
//   });
// }

function renderGame(deck, user, computer) {
  let isOver = true;
  let computerTotal = "?";
  if (isOver) {
    computerTotal = calculateTotal(computer);
  }
  document.body.onload = renderTotal("Computer", computer, computerTotal);
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
  renderGame(remainingCards, userHand, computerHand);
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
