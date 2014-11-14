/**
 *   Project name: tool_box.github.io
 *           Data: 14.11.2014
 *           Time: 16:10
 **/
"use strict";
window.onload = (function () {
});

var sizeModule, sizeModule2;

sizeModule = (function () {
   var _arrWxH = []; // приватная переменная

   return { // методы доступные извне
      ofser: (function () {
         _arrWxH.push(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight, 4 / 3);
         return _arrWxH.slice(0, 4);
      })(),
      init: function () {
         var it = this;
         console.log(it.ofser);
      },
      getItemCount: function () {
      },
      getTotal: function () {
      }
   }
})();

sizeModule2 = (function () {
   var _arrWxH = []; // приватная переменная
   var _privat = {
      ofser: (function () {
         _arrWxH.push(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight, 4 / 3);
         return _arrWxH.slice(0, 4);
      })(),
      init: function () {
         var it = this;
         console.log(it.ofser);
      },
      getItemCount: function () {
      },
      getTotal: function () {
      }
   };
   return{
      facade: function(){return _privat.init()}
   }
})();
