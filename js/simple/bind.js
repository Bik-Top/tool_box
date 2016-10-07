/**
 *03.12.2014                           11:26
 *   Project name: tool_box
 *           File:  bind
 **/
"use strict";
/**
 *
 * @param obj
 * @param event_name
 * @param handler
 * @returns {handler_wrapper}
 */
function bind(obj, event_name, handler) {
   var handler_wrapper = function(event) {
      event = event || window.event;
      if (!event.target && event.srcElement) {
         event.target = event.srcElement;
      }
      return handler.call(obj, event);
   };

   if (obj.addEventListener) {
      obj.addEventListener(event_name, handler_wrapper, false);
   } else if (obj.attachEvent) {
      obj.attachEvent('on' + event_name, handler_wrapper);
   }
   return handler_wrapper;
}


// Usage:
bind($0, 'click', function(){alert('Good!')});