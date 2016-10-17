var frontPage;

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

      var fullQuote = mapFrontPage(frontPage, titleParser);
      var randomNum = Math.floor(Math.random() * 26) + 1;
      var quote = fullQuote[randomNum][0];
      var author = fullQuote[randomNum][1];

      $("#quote").html(quote);
      $("#author").html(author);
   }

   $("#quoteBtn").click(quoteBtnClick);
}

getRedditJSON("/r/quotes");
$(document).ready(eventHandlerHookup);
