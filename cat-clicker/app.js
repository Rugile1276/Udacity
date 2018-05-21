var firstCat = $('#cat1 img');
var secondCat = $('#cat2 img');
var firstCatClicks = 0;
var secondCatClicks = 0;
var firstCatName = "Nancy";
var secondCatName = "Tommy";

$('#cat1').prepend('<div>' + firstCatName + "</div>");
$('#cat2').prepend('<div>' + secondCatName + "</div>");


firstCat.on("click", function(){
    firstCatClicks++;
    $('.firstCatClicks').text(firstCatClicks);
});

secondCat.on("click", function(){
    secondCatClicks++;
    $('.secondCatClicks').text(secondCatClicks);
});

var cats = [];

var Cat = function(name, img, clicks) {
    this.name = name;
    this.img = img;
    this.clicks = clicks;
};

var cat1 = new Cat ("Louise", "img/cat1.jpg", 0);
var cat2 = new Cat ("Max", "img/cat2.jpg", 0);
var cat3 = new Cat ("Tom", "img/cat3.jpg", 0);
var cat4 = new Cat ("Peter", "img/cat4.jpg", 0);
var cat5 = new Cat ("Klaud", "img/cat5.jpg", 0);

cats.push(cat1);
cats.push(cat2);
// cats.push(cat3);
// cats.push(cat4);
// cats.push(cat5);

for(var i=0; i<cats.length; i++){

    $('body').prepend("<div class=" + cats[i].name + ">"+ cats[i].name + "</div>");
    $("." + 'cats[i].name').on("click", (function(cat){
        console.log("CLICKED");
        $('.' + cat.name).append("<div>"+ cat.clicks + "</div>");
        $('.' + cat.name).append("<img src='" + cat.img +"' alt='Second cat' height='300' width='300'>");
    })(cats[i]));
}
