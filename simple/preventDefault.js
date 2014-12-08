/**
 *04.12.2014                           12:51
 *   Project name: tool_box
 *           File:  preventDefault
 **/
"use strict";

function preventDefault(event) {
   if (event.preventDefault) {
      event.preventDefault();
   } else {
      event.returnValue = false;
   }
}