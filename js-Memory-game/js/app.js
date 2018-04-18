let cardsList;
let parent = $(".card-container");
let refresh = $(".fa-refresh");
let startAgain = $(".startAgain");
let openedCards = [];
let matchedCards = [];
let stars;
let movesCount;
let starsCount;
let t = 0;
let whichClick;
let timer;

//Mix cards
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Mix cards and reset all status/classes
function startGame() {
  cardsList = $(".card");
  let shuffledCards = shuffle(cardsList);

  movesCount = 0;
  starsCount = 3;
  whichClick = 0;

  $("#moves").text(movesCount);
  $("#stars").text(starsCount);

  shuffledCards.each(function(index) {
    $(this).appendTo(parent);
  });

  resetClasses();
}

// Resets all classes to default
function resetClasses() {
  $(".card").removeClass("rotated");
  $(".card").removeClass("matched");
  $(".card").removeClass("unmatched");

  stars = $(".fa-star-o");
  $(stars)
    .removeClass("fa-star-o")
    .addClass("fa-star");
}

// Rotate card to see icon
function flipCard(card) {
  if (card.hasClass("front")) {
    card.parent().addClass("rotated");
    addOpenedCardToList(card.parent());
  } else {
    card.removeClass("rotated");
  }
}

// Checks if cards is matched or not
function addOpenedCardToList(openedCard) {
  openedCards.push(openedCard);

  if (openedCards.length == 2) {
    increaseMoves();
    if (openedCards[0].attr("type") === openedCards[1].attr("type")) {
      match(openedCards);
    } else {
      unmatch();
    }
  }
}

// Increase moves count
function increaseMoves() {
  movesCount++;
  $("#moves").text(movesCount);
  if (movesCount === 9 || movesCount === 17) {
    removeStar();
  }
}

// Remove start when too many moves done
function removeStar() {
  starsCount--;
  console.log(movesCount + " ads " + starsCount);
  $("#stars").text(starsCount);
  stars = $(".fa-star");
  $(stars[stars.length - 1])
    .removeClass("fa-star")
    .addClass("fa-star-o");
}

// If cards are matched, it leaves opened
function match(openedCards) {
  openedCards.map(card => card.addClass("matched"));
  openedCards.pop(openedCards[0]);
  openedCards.pop(openedCards[1]);
  matchedCards.push(openedCards[0]);
  matchedCards.push(openedCards[1]);

  if (matchedCards.length == 16) {
    win();
  }
}

// If cards unmatched, it should be flip again
function unmatch() {
  openedCards.map(card => card.addClass("unmatched"));
  cardsList.off("click");

  setTimeout(function() {
    openedCards.map(card => {
      card.removeClass("rotated unmatched");
    });
    openedCards = [];
    cardsList.on("click", e => handleCardClick());
  }, 1000);
}

function win() {
  setTimeout(function() {
      clearInterval(timer);
    $("#ex1").modal();
    $("#ex1 #stars").text(starsCount);
    $("#ex1 #moves").text(movesCount);
    $("#ex1 #time").text(t);
  }, 500);
}

function handleCardClick() {
    whichClick++;
    if(whichClick == 1){
        timer = setInterval( () => { updateTimer() }, 1000);
    }
  let target = $(event.target);

  if (!target.parent().hasClass("matched")) {
    flipCard($(event.target));
  }
}
function updateTimer() { 
    $("#timer").text(t++);
 }

startGame();

cardsList.on("click", e => handleCardClick());
refresh.on("click", () => startGame());
startAgain.on("click", () => (window.location.href = "index.html"));
