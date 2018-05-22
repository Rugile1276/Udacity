
var model = {

    currentCat: null,

    cats: [
            {
                name: "Nancy",
                url: "img/cat1.jpg",
                clicks: 0,
            },
            {
                name: "Max",
                url: "img/cat2.jpg",
                clicks: 0,
            },
            {
                name: "Jon",
                url: "img/cat3.jpeg",
                clicks: 0,
            }
        ]
};

var octopus = {

    init: function() {

        model.currentCat = model.cats[0];
        this.adminMode = false;

        listView.init();
        catInfoView.init();
        adminFormView.init();

    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    getCats: function() {
        return model.cats;
    },
    setCurrentCat: function(cat) {

        model.currentCat = cat;
    },
    incrementCurretnCat: function() {
        model.currentCat.clicks++;
        catInfoView.render();
    },
    submitForm: function(name, clicks, img){
        model.currentCat.name = name;
        model.currentCat.clicks = clicks;
        model.currentCat.img = img;

        listView.render();
        catInfoView.render();
        adminFormView.remove();
    }
};

var listView = {
    init: function() {
        this.catsListElem = $('.catsList');
        this.render();
    },
    render: function() {

        var cat, elem, i;
        var cats = octopus.getCats();

        $(this.catsListElem).empty();

        for(i=0; i < cats.length; i++){
            cat = cats[i];

            elem = document.createElement('li');
            elem.textContent = cat.name;

            elem.addEventListener('click', ((catCopy) => {
                return () => {
                    octopus.setCurrentCat(catCopy);
                    catInfoView.render();
                };
            })(cat));

            $(this.catsListElem).append(elem);
        }

    }
};

var catInfoView = {
    init: function() {

        $('.img').on('click', () => {
            console.log("CLIKED");
            octopus.incrementCurretnCat();
        });

        this.catName = $(".currentCat .name");
        this.catClicks = $(".currentCat .clicks");
        this.catImg = $(".currentCat .img");

        this.render();
    },
    render: function() {
        var currentCatElem = $('.currentCat');
        var currentCat = octopus.getCurrentCat();
        $(this.catName).text(currentCat.name);
        $(this.catClicks).text(currentCat.clicks);
        $(this.catImg).attr("src", currentCat.url);

        if (octopus.adminMode == true) {
            adminFormView.render();
        }
    }

};

var adminFormView = {
    init: function(){
        this.adminModeButton = $(".adminModeButton");
        this.adminForm = $(".adminForm");

        $(this.adminModeButton).on("click", () => {
            if (octopus.adminMode == false) {
                this.render();
            }else{
                this.remove();
            }
        });
    },
    render: function(){
        $(this.adminForm).empty();
        octopus.adminMode = true;
        var currentCat = octopus.getCurrentCat();
            $(this.adminForm).append("<input class='name' value="+ currentCat.name +"></input>");
            $(this.adminForm).append("<input class='clicks' value=" + currentCat.clicks + "></input>");
            $(this.adminForm).append("<input class='img' value=" + currentCat.url + "></input>");
            $(this.adminForm).append("<button class='cancel'>Cancel</button>");
            $(this.adminForm).append("<button class='submit' type='submit'>Submit</button>");

        $(".adminForm .submit").on("click", (e) => {
            e.preventDefault();
            this.catName = $(".adminForm .name").val();
            this.catClicks = $(".adminForm .clicks").val();
            this.catImg = $(".adminForm .img").val();

            octopus.submitForm(this.catName, this.catClicks, this.catImg);
        });
        $(".adminForm .cancel").on("click", (e) => {
            e.preventDefault();
            this.remove();

        });
    },
    remove: function(){
        $(this.adminForm).empty();
        octopus.adminMode = false;
    }
};

octopus.init();
