function getRedditJSON(subreddit) {
   var oReq = new XMLHttpRequest();
   oReq.open("GET", "https://www.reddit.com" + subreddit + ".json");
   oReq.onload = function() {
      var json = JSON.parse(this.responseText);
      frontPage = json.data.children;
   };
   oReq.onerror = function() {
      var error = $("<p></p>").html("Reddit and I aren't on speaking terms at the moment. Please refresh or come back later.");
      $("body").append(error);
   }
   oReq.send();
}

function mapFrontPage (data, fn) {
   var results = data.map(function(element) {
      return fn(element.data.title);
   });
   return results;
}

function eventHandlerHookup() {
   function quoteBtnClick() {
      function titleParser(title) {
         var arrSplit = title.split(/[.―~-]/g);
         return [arrSplit[0], arrSplit[arrSplit.length -1]];
      }

      function rowEffects() {
         function slideFadeColorize(height) {
            var colors = ["#3BE2FF", "#3BFF3B", "#FF3B62", "#FFD042"]
            $("#row3").fadeOut(null, function() {
               $("#invisiRow").height(height + 100);
               $("#row3").fadeTo(0, 1, function() {
                  $("#quote").html(quote);
                  $("#author").html(author);
               }).css("background-color", colors[randomRange(0, 3)]);
            });
         }

         var invisiHeight = $("#invisiRow").height();

         if(invisiHeight < 300) {
            slideFadeColorize(invisiHeight);
         } else {
            slideFadeColorize(-100);
         }
      }

      var fullQuote = mapFrontPage(frontPage, titleParser);
      var randomNum = randomRange(0, 26);
      var quote = fullQuote[randomNum][0];
      var author = fullQuote[randomNum][1];

      rowEffects();
   }

   $("#quoteBtn").click(quoteBtnClick);
}

function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

var frontPage;

getRedditJSON("/r/quotes");
$(document).ready(eventHandlerHookup);
