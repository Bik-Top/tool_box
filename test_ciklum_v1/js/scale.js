/**
 * Created by BikTop on 08.11.2014.
 */
window.onload = (function () {
  /*   document.body.innerHTML = '<div id="topSec" style="background: #00f;"></div>' +
   '<div id="wrapping" style="background: #0f0;">' +
   '<div id="imgPlace" style="background: #f0f;"> <img id="image1" class="image" src="https://fbcdn-photos-g-a.akamaihd.net/hphotos-ak-xpa1/t39.2082-0/p528x396/851538_506458892778613_1885463861_n.jpg" alt="Image"/></div>' +
   '</div>' +
   '<div id="ssBar" style="background: #f00;"></div>';*/
  //
  append(open_var.wrapping);
  open_var.wrapping.appendChild(open_var.imgPlace);
  open_var.imgPlace.appendChild(open_var.ig);
  open_var.imgPlace.appendChild(open_var.button_download);
  append(open_var.headerBar);
  append(open_var.footerBar);
  open_var.footerBar.appendChild(open_var.button_like);
  open_var.footerBar.appendChild(open_var.button_dislike);
  open_var.footerBar.appendChild(open_var.button_share);
  open_var.footerBar.appendChild(open_var.button_close);
  //append(open_var.footerBar);
  resizer();
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
    style: 'position: absolute; width: 100%; height: 8%; top: 0; '
  }),
  ig: newElem('img', {
    src: 'https://fbcdn-photos-g-a.akamaihd.net/hphotos-ak-xpa1/t39.2082-0/p528x396/851538_506458892778613_1885463861_n.jpg',
    style: ' width: 100%; height: 100%;'
  }),
  footerBar: newElem('div', {
    class: '',
    id: 'footerBar',
    style: 'position: absolute; width: 100%; bottom: 0;text-align: center;'
  }),
  footerBarVert: newElem('div', {
    class: '',
    id: 'footerBar',
    style: 'position: absolute; height: 100%; width: 8%;left: 0;top:0;'
  }),
  button_download: newElem('div', {
    class: '',
    id: 'button_download',
    style: ' height: 8%; width: 100%;background:#F00;'
  }),
  button_close: newElem('span', {
    class: '',
    id: 'button_close',
    style: 'display: inline-block; background:url(img/close.png); background-size: 100%;'
  }),
  button_like: newElem('span', {
    class: '',
    id: 'button_like',
    style: 'display: inline-block; background:url(img/like.png); background-size: 100%;'
  }),
  button_dislike: newElem('span', {
    class: '',
    id: 'button_dislike',
    style: 'display: inline-block; background:url(img/dislike.png); background-size: 100%;'
  }),
  button_share: newElem('span', {
    class: '',
    id: 'button_share',
    style: 'display: inline-block; background:url(img/share.png); background-size: 100%;'
  }),
  widthToHeight: 4 / 3
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
  console.log('el' + el);
}



function resizer() {
  var newWidth,
    newHeight, hh,
    hFooter,
    newWidthToHeight;
  hh = (open_var.footerBar.offsetHeight + open_var.headerBar.offsetHeight);
  hFooter = open_var.footerBar.offsetHeight;
  newWidth = window.innerWidth;
  newHeight = window.innerHeight;
  newWidthToHeight = newWidth / newHeight;
  if (newWidthToHeight > open_var.widthToHeight) {
    //console.log('landscape'); //landscape
    newWidth = newHeight * open_var.widthToHeight;
    open_var.wrapping.style.width = Math.floor(newWidth - hh - hFooter) + 'px';
     open_var.wrapping.style.height = Math.floor(newHeight - hh - hFooter) + 'px';
     open_var.imgPlace.style.width = Math.floor(newWidth - hh - hFooter) + 'px';
    open_var.imgPlace.style.height = Math.floor(newHeight - hh - hFooter) + 'px';
    open_var.wrapping.style.marginLeft = Math.floor((-newWidth + hh) / 2) + 'px';
    open_var.wrapping.style.marginTop = Math.floor((-newHeight + hh) / 2) + 'px';
    open_var.button_close.style.width = open_var.footerBar.offsetHeight - 4 + 'px';
    open_var.button_close.style.height = open_var.footerBar.offsetHeight - 4 + 'px';
    open_var.button_like.style.width = open_var.footerBar.offsetHeight - 4 + 'px';
    open_var.button_like.style.height = open_var.footerBar.offsetHeight - 4 + 'px';
    open_var.button_dislike.style.width = open_var.footerBar.offsetHeight - 4 + 'px';
    open_var.button_dislike.style.height = open_var.footerBar.offsetHeight - 4 + 'px';
    open_var.button_share.style.width = open_var.footerBar.offsetHeight - 4 + 'px';
    open_var.button_share.style.height = open_var.footerBar.offsetHeight - 4 + 'px';

  } else {
    //console.log('portrait'); //portrait
    newHeight = newWidth / open_var.widthToHeight;
    open_var.wrapping.style.width = Math.floor(newWidth - hh) + 'px';
    open_var.wrapping.style.height = Math.floor(newHeight - hh) + 'px';
    open_var.imgPlace.style.width = Math.floor(newWidth - hh - hFooter) + 'px';
    open_var.imgPlace.style.height = Math.floor(newHeight - hh - hFooter) + 'px';
    open_var.wrapping.style.marginLeft = Math.floor((-newWidth + hh) / 2) + 'px';
    open_var.wrapping.style.marginTop = Math.floor((-newHeight + hh) / 2) + 'px';
  }
}
//window.addEventListener('resize', resizer, false);
//window.addEventListener('orientationchange', resizer, false);
function addEvent(element, event, callback) {
  if (window.addEventListener) {
    element.addEventListener(event, callback, false);
  } else if (document.attachEvent) {
    element.attachEvent('on' + event, callback);
  } else {
    element['on' + event] = callback;
  }
}
addEvent(window, 'resize', resizer);
/**/


