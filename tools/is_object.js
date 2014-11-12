/**
 *   Project name: tool_box.github.io
 *           Data: 12.11.2014
 *           Time: 14:25
 **/
"use strict";
function is_object(object) {
   return Object.prototype.toString.call(object) === '[object Object]';
}
function traverse_object(object, callback) {
   var key;
   for (key in object) {
      if (object.hasOwnProperty(key)) {
         if (is_object(object[key])) {
            traverse_object(object[key], callback);
         } else {
            callback(object[key], key);
         }
      }
   }
}