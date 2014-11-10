/**
 * Created by BikTop on 08.11.2014.
 */
window.onload = (function () {
   nodeKill(document.querySelector('.wrapper'));
});
function nodeKill(node) {
   node.parentNode.removeChild(node);
}



function getJ(url, callback) {
   var httpRequest; // создаём наш XMLHttpRequest-объект
   if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
   } else if (window.ActiveXObject) {
      // для дурацкого Internet Explorer'а
      httpRequest = new
         ActiveXObject("Microsoft.XMLHTTP");
   }
   httpRequest.onreadystatechange = function () {
      // встраиваем функцию проверки статуса нашего запроса
      // это вызывается при каждом изменении статуса
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
         callback.call(httpRequest.responseXML); // вызываем колбек
      }
   };
   httpRequest.open('GET', url);
   httpRequest.send();
}
// вызываем функцию
getJ("ajax/ads.json", function () {
   console.log(this);
});
console.log("это выполнится до вышеуказанного колбека");


