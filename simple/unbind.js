/**
 *04.12.2014                           14:39
 *   Project name: tool_box
 *           File:  unbind
 **/
"use strict";

function unbind(obj, event_name, handler_wrapper) {
   if (obj.removeEventListener) {
      obj.removeEventListener(event_name, handler_wrapper, false);
   } else if (obj.detachEvent) {
      obj.detachEvent('on' + event_name, handler_wrapper);
   }
}