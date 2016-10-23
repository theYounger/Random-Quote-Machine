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
         arrSplit[0] = arrSplit[0].replace(/^["']/, " ");
         return [arrSplit[0], arrSplit[arrSplit.length -1]];
      }
      function rowEffects() {
         var colors = ["rgb(59, 226, 255)", "rgb(59, 255, 59)", "rgb(255, 59, 98)", "rgb(255, 208, 66)"];
            chosenColor = function compareColors() {
            var randomColor = colors[randomRange(0,3)];
            if($("#row3").css("background-color") !== randomColor) {
               return randomColor;
            }
            return compareColors();
         }();

         $("#row3").fadeOut(null, function() {
            $(this).fadeTo(0, 1, function() {
               $("#quote").html(quote + "\"");
               $("#author").html(author);
               $("#reddit-url").attr("href", quoteUrl);
            }).css("background-color", chosenColor);
         });
      }

      var quoteYou = mapFrontPage(frontPage, titleParser);
      var randomNum = randomRange(0, 26);
      var quoteUrl = frontPage[randomNum].data.url;
      var quote = quoteYou[randomNum][0];
      var author = quoteYou[randomNum][1];
      var encodedURI = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURI('"' + quote + '"' + " ― " + author);

      $("#twitter-btn").attr("href", encodedURI);
      rowEffects();
   }

   function hoverIn() {
      $(this).css("color", "white");
   }

   function hoverOut() {
      $(this).css("color", chosenColor);
   }

   function spanChange(selector) {
      $(selector).css("color", chosenColor);
   }

   var chosenColor;

   $(".fa-reddit-alien").hover(hoverIn, hoverOut);
   $(".fa-reddit-alien").click(quoteBtnClick)
   $(".fa-reddit-alien").click(function() {
      spanChange('#click-snoo');
   });
}

$("quoteBtnClick").click();

function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
}

var frontPage;

getRedditJSON("/r/quotes");
$(document).ready(eventHandlerHookup);
