$(document).ready(function() {

   var that;

   $("#quoteStation").click(function(event) {
      $("#quoteStation").css("background-color", "purple");
      alert(event.currentTarget === that);
      console.log(event.currentTarget)
   })


   $("#quoteBtn").click(function(event) {
      var currBg = $(".stationRow").css("background-color");
      var currMarTop = $(".stationRow").css("margin-top");
      var currMarTopNum = Number(currMarTop.slice(0, currMarTop.length - 2));
      that = this;

      if(currBg != "rgb(0, 0, 255)") {
         currBg = "rgb(0, 0, 255)";
      } else {
         currBg = "rgb(0, 255, 0)";
      }

      // var xml = new XMLHttpRequest();
      // xml
      //    .onload = function(json) {
      //       console.log(JSON.stringify(json));
      //    }
      //    .open("GET", "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json")
      //    .setRequestHeader("Api-User-Agent", "Chrome/53.0.2785.143")
      //    .send();
      // var p = $("p")
      // p.html("Lucky me");
      // $(".stationRow").append(p);
      $(".stationRow")
         .css("background-color", currBg)
         .css("margin-top", ++currMarTopNum);

   })
   $("#quoteBtn")
      .click();

});