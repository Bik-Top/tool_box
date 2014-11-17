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
  //console.log(arr);
  if (arr[2] > arr[3]) {
    landscape(arr);
  }
  else {
    portrait(arr);
  }

  return false;
}

function landscape(arr) {
 //console.log('landscape w='+ arr  );
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
  //console.log('portrait: w='+ w +' h='+ h);
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
  xhttp=new XMLHttpRequest();


  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function(){
    if (xhttp.readyState==4 && xhttp.status==200){
      var ads=this.ads;
      console.log(ads);



      templete = document.querySelector('#templ').innerHTML,
        result = document.querySelector('.result'),

        i = 0,
        len = data.length;
     // var rex = /www/igm;
      for (; i < len; i++) {
        result.innerHTML += templete
          .replace(/{{url}}/, data[i].description)
          .replace(/{{share_url}}/, data[i].description)
          .replace(/{{image_url}}/, data[i].url)
          .replace(/{{image_url}}/,  data[i].url)
          .replace(/{{url}}/, +[i] + 1)
          .replace(/{{button_name}}/, +[i] + 1)
          .replace(/{{ad_dislike}}/, +[i] + 1)
          .replace(/{{ad_hide}}/, +[i] + 1)
          .replace(/{{ad_share}}/, data[i].tags);
      }
  /*    function cheskUrl(){
        var str = data[i].url;
        if(str.match(rex)[0]=='www'){
          data[i].url.split('www')[1].split('/')[0].slice(1);
        }
        else{data[i].url}
      }*/
    }
  };
  xhttp.open("GET","../test_ciklum_v1/ajax/ads.json",true);
  xhttp.send();
}




/*;(function() {
  var data = [
    {
      url: 'https://www.google.com',
      description: 'Поисковая машина google',
      tags: ['object', 'types']
    }
  ];


  templete = document.querySelector('#templ').innerHTML,
    result = document.querySelector('.result'),

    i = 0,
    len = data.length;
  var rex = /www/igm;
  for (; i < len; i++) {
    result.innerHTML += templete

      .replace(/{{description}}/, data[i].description)
      .replace(/{{description}}/, data[i].description)
      .replace(/{{url}}/, data[i].url)
      .replace(/{{url}}/,  data[i].url)
      .replace(/{{numerickal}}/, +[i] + 1)
      .replace(/{{tags}}/, data[i].tags);
  }
  function cheskUrl(){
    var str = data[i].url;
    if(str.match(rex)[0]=='www'){
      data[i].url.split('www')[1].split('/')[0].slice(1);
    }
    else{data[i].url}
  }
})();*/




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
