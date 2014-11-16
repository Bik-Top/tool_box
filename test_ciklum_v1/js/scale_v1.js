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




if (!document.myGetElementsByClassName) {
   document.myGetElementsByClassName = function (className) {
      var children = document.getElementsByTagName('*') || document.all;
      var elements = new Array();
      for (var i = 0; i < children.length; i++) {
         var child = children[i];
         var classNames = child.className.split(' ');
         for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
               elements.push(child);
               break;
            }
         }
      }
      return elements;
   }
}

var Reflection = {
   defaultHeight: 0.5, defaultOpacity: 0.5, add: function (image, options) {
      Reflection.remove(image);
      var doptions;
      doptions = {"height": Reflection.defaultHeight, "opacity": Reflection.defaultOpacity}
      if (options) {
         for (var i in doptions) {
            if (!options[i]) {
               options[i] = doptions[i];
            }
         }
      } else {
         options = doptions;
      }
      try {
         var d = document.createElement('div');
         var p = image;
         var classes = p.className.split(' ');
         var newClasses = '';
         var j;
         for (j = 0; j < classes.length; j++) {
            if (classes[j] != "reflect") {
               if (newClasses) {
                  newClasses += ' '
               }
               newClasses += classes[j];
            }
         }
         var reflectionHeight = Math.floor(p.height * options['height']);
         var divHeight = Math.floor(p.height * (1 + options['height']));
         var reflectionWidth = p.width;
         if (document.all && !window.opera) {
            if (p.parentElement.tagName == 'A') {
               var d = document.createElement('a');
               d.href = p.parentElement.href;
            }
            d.className = newClasses;
            p.className = 'reflected';
            d.style.cssText = p.style.cssText;
            p.style.cssText = 'vertical-align: bottom';
            var reflection = document.createElement('img');
            reflection.src = p.src;
            reflection.style.width = reflectionWidth + 'px';
            reflection.style.display = 'block';
            reflection.style.height = p.height + "px";
            reflection.style.marginBottom = "-" + (p.height - reflectionHeight) + 'px';
            reflection.style.filter = 'flipv progid:DXImageTransform.Microsoft.Alpha(opacity=' + (options['opacity'] * 100) + ', style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=' + (options['height'] * 100) + ')';
            d.style.width = reflectionWidth + 'px';
            d.style.height = divHeight + 'px';
            p.parentNode.replaceChild(d, p);
            d.appendChild(p);
            d.appendChild(reflection);
         } else {
            var canvas = document.createElement('canvas');
            if (canvas.getContext) {
               d.className = newClasses;
               p.className = 'reflected';
               d.style.cssText = p.style.cssText;
               p.style.cssText = 'vertical-align: bottom';
               var context = canvas.getContext("2d");
               canvas.style.height = reflectionHeight + 'px';
               canvas.style.width = reflectionWidth + 'px';
               canvas.height = reflectionHeight;
               canvas.width = reflectionWidth;
               d.style.width = reflectionWidth + 'px';
               d.style.height = divHeight + 'px';
               p.parentNode.replaceChild(d, p);
               d.appendChild(p);
               d.appendChild(canvas);
               context.save();
               context.translate(0, image.height - 1);
               context.scale(1, -1);
               context.drawImage(image, 0, 0, reflectionWidth, image.height);
               context.restore();
               context.globalCompositeOperation = "destination-out";
               var gradient = context.createLinearGradient(0, 0, 0, reflectionHeight);
               gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
               gradient.addColorStop(0, "rgba(255, 255, 255, " + (1 - options['opacity']) + ")");
               context.fillStyle = gradient;
               context.rect(0, 0, reflectionWidth, reflectionHeight * 2);
               context.fill();
            }
         }
      } catch (e) {
      }
   }, remove: function (image) {
      if (image.className == "reflected") {
         image.className = image.parentNode.className;
         image.parentNode.parentNode.replaceChild(image, image.parentNode);
      }
   }
};


function addReflections() {
   var rimages = document.myGetElementsByClassName('reflect');

   for (var i = 0; i < rimages.length; i++) {
      var rheight = null;
      var ropacity = null;
      var classes = rimages[i].className.split(' ');
      var j;
      for (j = 0; j < classes.length; j++) {
         if (classes[j].indexOf("rheight") == 0) {
            var rheight = classes[j].substring(7) / 100;
         } else if (classes[j].indexOf("ropacity") == 0) {
            var ropacity = classes[j].substring(8) / 100;
         }
      }
      Reflection.add(rimages[i], {height: rheight, opacity: ropacity});
   }
}



var previousOnload = window.onload;
window.onload = function () {
   if (previousOnload)previousOnload();
   addReflections();
}