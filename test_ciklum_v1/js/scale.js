/**
 * Created by BikTop on 08.11.2014.
 */
window.onload = (function () {
   /*   document.body.innerHTML = '<div id="topSec" style="background: #00f;"></div>' +
    '<div id="wrapping" style="background: #0f0;">' +
    '<div id="imgPlace" style="background: #f0f;"> <img id="image1" class="image" src="https://fbcdn-photos-g-a.akamaihd.net/hphotos-ak-xpa1/t39.2082-0/p528x396/851538_506458892778613_1885463861_n.jpg" alt="Image"/></div>' +
    '</div>' +
    '<div id="ssBar" style="background: #f00;"></div>';*/
   append(open_var.headerBar);
   append(open_var.wrapping);
   open_var.wrapping.appendChild(open_var.imgPlace);
   open_var.imgPlace.appendChild(open_var.ig);
   append(open_var.footerBar);
   resizeGame();
});
window.open_var = {
   wrapping: newElem('div', {
      id: 'wrapping',
      style: ' position: absolute; top: 50%; left: 50%;'
   }),
   imgPlace: newElem('div', {
      id: 'imgPlace',
      style: ' width: 100%; height: 100%;'
   }),
   headerBar: newElem('div', {
      id: 'headerBar',
      style: 'position: absolute; width: 100%; height: 8%; top: 0; opacity: 0.8;'
   }),
   ig: newElem('img', {
      src: 'https://fbcdn-photos-g-a.akamaihd.net/hphotos-ak-xpa1/t39.2082-0/p528x396/851538_506458892778613_1885463861_n.jpg',
      style: ' width: 100%; height: 100%;'
   }),
   footerBar: newElem('div', {
      class: '',
      id: 'footerBar',
      style: 'position: absolute; width: 100%; height: 8%;bottom: 0;opacity: 0.8;'
   })
};


function newElem(tag, params) {
   params = params || {};
   var elem = document.createElementNS ?
      document.createElementNS('http://www.w3.org/1999/xhtml', tag) :
      document.createElement(tag);
   for (var pr in params) {
      attr(elem, pr, params[pr]);
   }
   return elem;
}
function attr(el, at, value) {
   at = {'for': 'htmlFor', 'class': 'className'}[at] || at;
   if (!value) {
      return el[at] || el.getAttribute(at) || '';
   } else {
      if (at == 'style') {
         el.style.cssText = value;
         return;
      }
      el[at] = value;
      if (el.setAttribute)   el.setAttribute(at, value);
   }
}
function append(el, where) {
   (where || document.body).appendChild(el);
}
function remove(el) {
   el.parentNode.removeChild(el);
}
function resizeGame() {
   var wrapping,
      widthToHeight,
      newWidth,
      newHeight,
      newWidthToHeight;

   wrapping = document.getElementById('wrapping');
   widthToHeight = 4 / 3;
   newWidth = window.innerWidth;
   newHeight = window.innerHeight;
   newWidthToHeight = newWidth / newHeight;
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
   var imgPlace = document.getElementById('imgPlace');
   imgPlace.width = newWidth;
   imgPlace.height = newHeight;
}
window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);
/**/


