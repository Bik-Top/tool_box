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
   var httpRequest; // ������ ��� XMLHttpRequest-������
   if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
   } else if (window.ActiveXObject) {
      // ��� ��������� Internet Explorer'�
      httpRequest = new
         ActiveXObject("Microsoft.XMLHTTP");
   }
   httpRequest.onreadystatechange = function () {
      // ���������� ������� �������� ������� ������ �������
      // ��� ���������� ��� ������ ��������� �������
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
         callback.call(httpRequest.responseXML); // �������� ������
      }
   };
   httpRequest.open('GET', url);
   httpRequest.send();
}
// �������� �������
getJ("ajax/ads.json", function () {
   console.log(this);
});
console.log("��� ���������� �� �������������� �������");


