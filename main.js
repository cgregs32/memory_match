$(document).ready( function(){
  var match = [];
  var selection = []
  displayShuffle();
  $("img").hide();
  cardSelection(match, selection);

  function cardSelection(match, selection){
    $(".card").on("click", function(){
      remove_click(match)

      console.log('click')
      if (selection.length === 2) {
        $(".card").off("click");
        id = $(this).attr("id");

        cardComparison(match, selection)
      } else {
        $(this).children().show();
        id = $(this).attr("id");
        selection.push(id);
      }
    });
  }


  function cardComparison(match, selection){
    var cardAImg = ($("#" + selection[0]).children().attr("src"));
    var cardBImg = ($("#" + selection[1]).children().attr("src"));
    var cardADiv = ($("#" + selection[0]).children());
    var cardBDiv = ($("#" + selection[1]).children());
    if (cardAImg === cardBImg) {

      $("#" + selection[0]).off('click')
      $("#" + selection[1]).off('click')
      $("#" + selection[0]).show();
      $("#" + selection[1]).show();
      match.push(selection[0]);
      match.push(selection[0]);
      console.log(match)
      if (match.length === 16){
        console.log("YOU WIN!")
      } else {
        selection = [];
        cardSelection(match, selection);
      }
    }
    else {
      $(cardADiv).hide();
      $(cardBDiv).hide();
      selection = [];
      cardSelection(match, selection);
    }
  }
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  function displayShuffle(){
    var picIDs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    var shuffledPics = shuffle(picIDs);
    for (var i = 0; i < shuffledPics.length; i++){
      $(".card").each(function(i, card) {
        $(card).html("<img src=./images/" + shuffledPics[i] + ".png>");
      });
    }
  }
});
