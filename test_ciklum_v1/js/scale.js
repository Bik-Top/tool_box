/**
 * Created by BikTop on 08.11.2014.
 */
window.onload = (function () {


   document.body.innerHTML = '<div id="topSec" style="background: #00f;"></div>' +
      '<div id="wrapping" style="background: #0f0;">' +
      '<div id="gameCanvas" style="background: #f0f;"> <img id="image1" class="image" src="https://fbcdn-photos-g-a.akamaihd.net/hphotos-ak-xpa1/t39.2082-0/p528x396/851538_506458892778613_1885463861_n.jpg" alt="Image"/></div>' +
      '</div>' +
      '<div id="ssBar" style="background: #f00;"></div>'


   resizeGame()  ;

});

function resizeGame() {
   var wrapping = document.getElementById('wrapping');
   var widthToHeight = 4 / 3;
   var newWidth = window.innerWidth;
   var newHeight = window.innerHeight;
   var newWidthToHeight = newWidth / newHeight;

   if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      wrapping.style.height = newHeight + 'px';
      wrapping.style.width = newWidth + 'px';
   } else {
      newHeight = newWidth / widthToHeight;
      wrapping.style.width = newWidth + 'px';
      wrapping.style.height = newHeight + 'px';
   }

   wrapping.style.marginTop = (-newHeight / 2) + 'px';
   wrapping.style.marginLeft = (-newWidth / 2) + 'px';

   var gameCanvas = document.getElementById('gameCanvas');
   gameCanvas.width = newWidth;
   gameCanvas.height = newHeight;
}

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);


