$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have defined URLs', function() {
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('have defined names', function() {
            for(let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });

    describe('The menu', function() {

        it('is hidden', function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

        it('is expandable', function() {
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).toBe(false);
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });


    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed("2", function(){
                done();
            });
        });
            
        it('feed container is not empty', function() {
            var entryLinks = $('.feed .entry');
            expect(entryLinks.length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {

        var entryLinksBefore;
        var entryLinksAfter;

        beforeEach(function(done){
            loadFeed(0, function(){
                entryLinksBefore = $('.entry-link');
                loadFeed(1, function(){
                    entryLinksAfter = $('.entry-link');
                    done();
                });
            });
        });

        it('content changes after loadFeed() is invoked', function() {
            expect(entryLinksBefore).not.toBe(entryLinksAfter);
        });
    });

}());
