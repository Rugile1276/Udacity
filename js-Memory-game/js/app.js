let cardsList;
let parent = $(".card-container");
let refresh = $(".fa-refresh");
let startAgain = $(".startAgain");
let openedCards = [];
let matchedCards = [];
let moves = 0;
let starsCount = 3;
let stars;

//Mix cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
function startGame(){
    cardsList = $(".card");
    let shuffledCards = shuffle(cardsList);

    moves = 0;
    starsCount = 3;

    $("#moves").text(moves);
    $("#stars").text(starsCount);

    shuffledCards.each(function(index) {
        $(this).appendTo(parent);
    });

    resetClasses();

}

function resetClasses(){

  $(".card").removeClass( "rotated" );
  $(".card").removeClass( "matched" );
  $(".card").removeClass( "unmatched" );



  stars = $(".fa-star-o");
  $(stars).removeClass("fa-star-o").addClass("fa-star");

}


function flipCard(card){

    if (card.hasClass("front")){
        card.parent().addClass( "rotated" );
        addOpenedCardToList(card.parent());
    }else{
        card.removeClass( "rotated" );
    }

}

function addOpenedCardToList (openedCard) {
    openedCards.push(openedCard);

    if (openedCards.length == 2){
      increaseMoves();
        if (openedCards[0].attr("type") === openedCards[1].attr("type")){
            match(openedCards);
        }else{
            unmatch();
        }
    }

 }

 function increaseMoves() {
   moves++;
   $("#moves").text(moves);

   if ((moves === 5) || (moves === 10) || (moves === 15)){
     removeStar();
   }

 }

 function removeStar(){

   stars = $(".fa-star");
   $(stars[stars.length-1]).removeClass("fa-star").addClass("fa-star-o");
 }

 function match(openedCards){
    openedCards.map( card => card.addClass( "matched" ));
    openedCards.pop(openedCards[0]);
    openedCards.pop(openedCards[1]);
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);

    if (matchedCards.length == 16){
      win();
    }

 }

 function unmatch(){
   //$(openedCards).effect( "shake", { direction: "up", times: 4, distance: 50}, 1000 );
   openedCards.map( card => card.addClass( "unmatched" ));
   cardsList.off("click");

    setTimeout(function(){
        openedCards.map( card => {
          card.removeClass( "rotated unmatched" )
        });
        openedCards = [];
        cardsList.on("click", (e) => handleCardClick());
    }, 1000);

}

function win(){
  window.location.href = "congrats.html";
  console.log("as");
  $("#movesCount").text(moves);
  $("#starsCount").text(starsCount);
}

function handleCardClick(){
  let target = $(event.target);

  if (!target.parent().hasClass("matched")){
      flipCard($(event.target));
  }

}

startGame();

cardsList.on("click", (e) => handleCardClick());
refresh.on("click", () => startGame());
startAgain.on("click", () => window.location.href = "index.html");
