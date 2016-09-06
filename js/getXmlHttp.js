/**
 *03.12.2014                           16:55
 *   Project name: tool_box
 *           File:  getXmlHttp
 **/
"use strict";
/**
 *
 * @returns {*}
 */
function getXmlHttp() {
   var xmlhttp;
   try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
   } catch (e) {
      try {
         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (E) {
         xmlhttp = false;
      }
   }
   if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
      xmlhttp = new XMLHttpRequest();
   }
   return xmlhttp;
}