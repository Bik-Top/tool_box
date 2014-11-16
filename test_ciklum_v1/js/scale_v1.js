/**
 *   Project name: tool_box.github.io
 *           Data: 14.11.2014
 *           Time: 16:10
 **/
"use strict";
window.onload = (function () {
   window.addEventListener('resize', sizeModule.init, false);
});
var sizeModule;

sizeModule = (function () {
   var _arrWxH = []; // приватная переменная
   return { // методы доступные извне
      init:  function () {
         _arrWxH.push(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight, 4 / 3);
         var arr =_arrWxH.splice(0, _arrWxH.length);

         sizeModule.calculate(arr);
      } ,
      calculate: function (arr) {  //arr [W=320, H=440, W/H=0.7272727272727273, 4/3=1.3333333333333333]
         var noda;
         var    nw, nh;
         nw = Math.floor(arr[0]/arr[3]);
         nh = Math.floor(arr[1]/arr[3]);
         noda = document.getElementById('wrapping');
          var n = noda.style.width.slice(0,-2)/noda.style.height.slice(0,-2);
         if (arr[2] >  arr[3]) {  console.log('landscape');  //landscape
            noda.style.width= nw +'px';
            noda.style.height= nh +'px';
         }
        else {              // console.log('portrait');     //portrait

            noda.style.width= nw +'px';
            noda.style.height= nh +'px';
            // newHeight = newWidth / open_var.widthToHeight;
            // open_var.wrapping.style.height = newHeight-coefHeight + 'px';
            // open_var.wrapping.style.width = newWidth-coefWidth + 'px';
         } /**/

         noda.style.marginLeft = ((-arr[0] )/ 2) + 'px';
         noda.style.marginTop = ((-arr[1] )/ 2) + 'px';
      },
      getItemCount: function (arr) {
         //console.log('wh= '+ arr);
      },
      getTotal: function () {
      }
   }

})();

