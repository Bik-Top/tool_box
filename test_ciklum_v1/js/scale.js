/**
 * Created by BikTop on 08.11.2014.
 */
window.onload=(function(){
   document.querySelector('.wrapper').rem
});


function resizeGame() {
  var gameArea = document.querySelector('.container');
  var widthToHeight = 4 / 3;
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;
  var newWidthToHeight = newWidth / newHeight;

  if (newWidthToHeight > widthToHeight) {
    newWidth = newHeight * widthToHeight;
    gameArea.style.height = newHeight + 'px';
    gameArea.style.width = newWidth + 'px';
  } else {
    newHeight = newWidth / widthToHeight;
    gameArea.style.width = newWidth + 'px';
    gameArea.style.height = newHeight + 'px';
  }

  gameArea.style.marginTop = (-newHeight / 2) + 'px';
  gameArea.style.marginLeft = (-newWidth / 2) + 'px';

  var gameCanvas = document.querySelector('.container');
  gameCanvas.width = newWidth;
  gameCanvas.height = newHeight;
}


window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);
