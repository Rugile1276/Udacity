let cardsList = $(".card");
let parent = $(".card-container");
let openedCards = [];


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

function startGame(){
    let shuffledCards = shuffle(cardsList);
    cardsList.remove();
    shuffledCards.each(function(index) {
        $(this).appendTo(parent);
      });
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
    console.log(openedCards.length);
    if (openedCards.length == 2){
        if (openedCards[0].attr("type") === openedCards[1].attr("type")){
            match(openedCards);
        }else{
            unmatch();
        }
    }
 }

 function match(openedCards){
    openedCards[0].addClass( "matched" );
    openedCards[1].addClass( "matched" );
    openedCards.pop(openedCards[0]);
    openedCards.pop(openedCards[1]);
 }

 function unmatch(){
    setTimeout(function(){ 
        openedCards.map( card => card.removeClass( "rotated" )); 
        openedCards = [];
    }, 1000);
}

startGame();

cardsList.on("click", (e) => {
    let target = $(event.target);
    if (!target.parent().hasClass("matched")){
        flipCard($(event.target));
    }
})





