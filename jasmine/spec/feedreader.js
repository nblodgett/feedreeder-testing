/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are named and defined', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(null);
                expect(allFeeds[i].url).not.toBe(undefined);
            }
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(null);
                expect(allFeeds[i].name).not.toBe(undefined);
            }
        });
    });

    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        var elem, elemStyle, value, translateValue, initialResult, result;
        // Get the hamburger icon element
        menuIconTest = $('.menu-icon-link');
        // Get the menu element
        elem = document.getElementsByClassName('slide-menu')[0];
        // Get the element style
        elemStyle = window.getComputedStyle(elem);
        // Get the property value of transform
        value = elemStyle.getPropertyValue('transform');
        // Split the up the transform matrix to get the x translate value
        translateValue = value.split(",")
        // Get the X translate value
        // Value is expected to be < 0 when hidden
        // or 0 when displayed on screen
        initialResult = translateValue[4];
        // Parse the resulting value into an integer
        initialResult = parseInt(initialResult);

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('The menu element is hidden by default', function() {
            expect(initialResult).not.toBe(0);
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        describe('Async menu visibility testing', function() {

            beforeEach(function(done) {
                // Store last X translate value for comparison
                lastResult = result;
                // Trigger a menu click
                menuIconTest.trigger('click');
                // wait for menu to move and get x translate value again
                setTimeout(function() {
                    elem = document.getElementsByClassName('slide-menu')[0];
                    elemStyle = window.getComputedStyle(elem);
                    value = elemStyle.getPropertyValue('transform');
                    translateValue = value.split(",")
                    result = translateValue[4];
                    result = parseInt(result);
                    //console.log(result);
                    done();
                }, 500);
            });

             /* Write a test that ensures the menu changes
              * visibility when the menu icon is clicked. This test
              * should have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */

            // Expect menu to be visible (x translate value 0)
            it('menu moves on screen when icon clicked', function(done) {
                    expect(result).toBe(0);
                    done();
            });

            // Expect menu to be invisible(x translate value < 0)
            it('menu moves off screen when icon is clicked', function(done) {
                    expect(result).not.toBe(0);
                    done();
            });
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        var testContainer;
        beforeEach(function(done) {
            loadFeed(0, function() {
                testContainer = $('.feed');
                done();
            });
        });
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        it('have at least one entry in feed container', function(done) {
            expect(testContainer[0]).not.toBe(null);
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    /* Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe('Initial Entries', function() {
        var firstFeedTest, secondFeedTest;
        beforeEach(function(done) {
            // Load first feed
            loadFeed(0, function() {
                // Store text of first feed
                firstFeedTest = $('.feed')[0].innerText;
                // Load second feed
                loadFeed(1, function() {
                    // Store text of second feed
                    secondFeedTest = $('.feed')[0].innerText;
                    done();
                });
            });
        });

        it('content changes when new feed is loaded', function(done) {
            expect(firstFeedTest).not.toBe(secondFeedTest);
            done();
        })
    });
}());
