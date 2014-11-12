   /**
    *   Project name: tool_box.github.io
    *           Data: 10.11.2014
    *           Time: 10:42
    **/
"use strict";

   function nodeKill(node){
      node.parentNode.removeChild(node);
   }





   function removeChildren(elem) {
      while(elem.lastChild) {
         elem.removeChild(elem.lastChild);
      }
   }
   function removeChildren(elem) {
      try {
         elem.innerHTML = '';
      } catch(e) {
         while(elem.firstChild) {
            elem.removeChild(elem.firstChild);
         }
      }
   }