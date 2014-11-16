/**
 * Created by BikTop on 16.11.2014.
 */
 window.onload=(function(){

 }());


function resizer() {
  var arr,_arrWxH= []; //arr [W=320, H=440, W/H=0.7272727272727273, 4/3=1.3333333333333333]
  _arrWxH.push(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight, 4 / 3);
  arr = _arrWxH.splice(0, _arrWxH.length);

             console.log(arr);
  if (arr[2]>arr[3]) {
      landscape(arr[0],arr[1]);
  }
  else {
      portrait(arr[0],arr[1]);
  }
}


function landscape(w,h) {
  console.log('landscape w='+ w +' h='+ h);
  var hederLand = document.getElementById('headerBar');
  var footerLand = document.getElementById('footerBar');
  addClass(hederLand, 'footer_left');
  addClass(footerLand, 'footer_left');
}
function portrait(w,h) {
  console.log('portrait: w='+ w +' h='+ h);
  var hederLand = document.getElementById('headerBar');
  var footerLand = document.getElementById('footerBar');
  removeClass(hederLand, 'footer_left');
  removeClass(footerLand, 'footer_left');
}


function addClass(node, class_name) {
  console.log(1);
  var re = new RegExp("(^|\\s)" + class_name + "(\\s|$)", "g");
  node.className = (node.className + " " + class_name).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function removeClass(node, class_name){
  console.log(2);
  var re = new RegExp("(^|\\s)" + class_name + "(\\s|$)", "g");
  node.className = node.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}


function create_el(){

}

//______________________________________________
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
