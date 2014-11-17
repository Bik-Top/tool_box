/**
 * Created by BikTop on 16.11.2014.
 */
window.onload= function(){

   resizer();
  addEvent(window, 'resize', resizer);
  addEvent(window, 'orientationchange', resizer);
};
function resizer() {
  var arr, _arrWxH = []; //arr [320, 480, 0.6666666666666666, 1.3333333333333333, 640, 240]
  _arrWxH.push( window.innerWidth,
                window.innerHeight,
                window.innerWidth/window.innerHeight,
                4 / 3,
                window.innerHeight*(4/3),
                window.innerWidth /(4/3));
  arr = _arrWxH.splice(0, _arrWxH.length);
  if (arr[2] > arr[3]) {
    landscape(arr);
  }
  else {
    portrait(arr);
  }

  return false;
}

function landscape(arr) {
  var hederLand = document.getElementById('headerBar');
  var footerLand = document.getElementById('footerBar');
  var wrapping = document.getElementById('wrapping');
  var imgPlace = document.getElementById('imgPlace');
  var  butt = document.querySelector('.button_download');
  var coefent =hederLand.offsetHeight+ butt.offsetHeight+14;
  wrapping.style.width= arr[4]+'px';
  wrapping.style.height= arr[1]+'px';
    imgPlace.style.width= arr[4]+'px';
    imgPlace.style.height= arr[1]+'px';
  wrapping.style.marginTop= (-arr[1]/2)+'px';
  wrapping.style.marginLeft= (-arr[4]/2)+'px';

  addClass(hederLand, 'footer_left');
  addClass(footerLand, 'footer_left');
  return false;
}
function portrait(arr) {
  var hederPort = document.getElementById('headerBar');
  var footerPort = document.getElementById('footerBar');
  var wrapping = document.getElementById('wrapping');
  var imgPlace = document.getElementById('imgPlace');

  wrapping.style.width= arr[0]+'px';
  wrapping.style.height= arr[5]+'px';
    imgPlace.style.width= arr[0]+'px';
    imgPlace.style.height= arr[5]+'px';
  wrapping.style.marginTop= (-arr[5]/2)+'px';
  wrapping.style.marginLeft= (-arr[0]/2)+'px';

  removeClass(hederPort, 'footer_left');
  removeClass(footerPort, 'footer_left');
  return false;
}

function addClass(node, class_name) {
  var re = new RegExp("(^|\\s)" + class_name + "(\\s|$)", "g");
  node.className = (node.className + " " + class_name).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
  return false;
}
function removeClass(node, class_name) {
  var re = new RegExp("(^|\\s)" + class_name + "(\\s|$)", "g");
  node.className = node.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
  return false;
}


function create_el(){

}

function start(){
  var request=new XMLHttpRequest();


  request=new XMLHttpRequest();
  request.open("GET","../test_ciklum_v1/ajax/ads.json",true);
  request.onreadystatechange=function(e){
    if (request.readyState==4 && request.status==200){
      var response = JSON.parse(this.responseText),
          templete = document.querySelector('#templ').innerHTML,
           i= 0,
          result = document.querySelector('.result');

      for (; i < 1; i++) {
        result.innerHTML += templete
          .replace(/{{ad_cl}}/, response.session.beacons.ad_close)
          .replace(/{{click_url}}/, response.ads[0].data.share_url)
          .replace(/{{image_url}}/, response.ads[0].data.image_url)
          .replace(/{{image_url}}/, response.ads[0].data.image_url)
          .replace(/{{url}}/, response.ads[0].data.click_url)
          .replace(/{{download_btn_color}}/, response.ads[0].data.download_btn_color)
          .replace(/{{button_name}}/, 'Download Now');
      }
    }
  };
  request.send();
}

start();




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
