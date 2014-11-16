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

         var noda;
         var wx,  hx,  nw, nh;
         nw = arr[0]/arr[3];
         nh = arr[1]/arr[3];
         wx = (arr[0] * 16) / 100;
         hx = (arr[1] * 16) / 100;
         noda = document.getElementById('wrapping');

         if (arr[2] >= arr[3]) { console.log('landscape');  //landscape
            noda.style.width= nw-wx+'px';
            noda.style.height= nh-hx+'px';
         }
         else {               console.log('portrait');     //portrait
            // newHeight = newWidth / open_var.widthToHeight;
            // open_var.wrapping.style.height = newHeight-coefHeight + 'px';
            // open_var.wrapping.style.width = newWidth-coefWidth + 'px';
         }

         noda.style.marginLeft = ((-arr[0]+wx)/ 2) + 'px';
         noda.style.marginTop = ((-arr[1]+hx)/ 2) + 'px';
         //sizeModule.getItemCount(wh);
      } ,
      calculate: function (arr) {

      },
      getItemCount: function (arr) {
         //console.log('wh= '+ arr);
      },
      getTotal: function () {
      }
   }

})();

