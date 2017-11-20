$(document).ready( function(){
  clickCounter = 0;
  matchCounter = 0;
  totalClicks = 0;
  startGame();
  reset();
});

function reset(){
  $(document).on('click', '.button', function(){
    $('.wrapper').html("")
    for(var i = 1; i <= 16; i++){
      $('.wrapper').append("<div id='" + i + "' class='card'></div>")
    }
    matchCounter = 0;
    totalClicks = 0;
    clickTotal();
    startGame();
  });
}

function clickTotal(){
  $('#click-counter').html(totalClicks);
}

function startGame(){

  displayShuffle();
  setTimeout(function(){
    $('.card').children().hide()
  }, 2000);
  $('.card').addClass('background')
  clickAction();
}

function clickAction(){
  var clicked1;
  var clicked2;

  $('.card').on('click', function(){
    switch (clickCounter) {
      case 0:
        clickCounter++;
        totalClicks++;
        clicked1 = this.id
        $('#' + clicked1).children().show()
        flipBackground(this.id)
        break;
      case 1:
        clicked2 = this.id
        $('#' + clicked2).children().show()
        flipBackground(this.id)

        matchCheck(clicked1, clicked2)
        clickCounter++;
        totalClicks++;
      case 2:
        clicked1 = null;
        clicked2 = null;
        clickCounter = 0;
    }
    if (matchCounter === 8){
      winCondition();
    }
    console.log(totalClicks)
    clickTotal();

  });

}

function flipBackground(id){
  $('#'+id).removeClass('background')
  $('#'+id).addClass('background-flip')
}
function flipBack(id){
  $('#'+id).removeClass('background-flip')
  $('#'+id).addClass('background')
}

function winCondition(){
  $('.card').addClass('visibility');
  var winDiv = "<div class='you-win'>Congrats, You Win!</div>"
  var button = "<button class='button'>Play Again?</button>"
  $('.wrapper').html(winDiv)
  $('.wrapper').append(button)
}

function matchCheck(click1, click2){
  var checkSource1 = $('#'+click1).children().attr('src')
  var checkSource2 = $('#'+click2).children().attr('src')
  var id1 = $('#'+click1);
  var id2 = $('#'+click2);
  if (id1.attr('id') === id2.attr('id')){
    flippidy(click1, click2)

  }else if(checkSource1 === checkSource2){
    setTimeout(function(){
      id1.addClass("hidden")
      id2.addClass("hidden")
    }, 1000);
    matchCounter++;
  }else{
  setTimeout(function(){
    flippidy(click1, click2)
  }, 1000);
  }
}

function flippidy(id1, id2){
  $('#' + id1).children().hide()
  $('#' + id2).children().hide()
  flipBack(id1)
  flipBack(id2)
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
      $(card).html("<img src=./images/" + picIDs[i] + ".png>");
    });
  }
}
