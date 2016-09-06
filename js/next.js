/**
 *03.12.2014                           17:04
 *   Project name: tool_box
 *           File:  next
 **/
"use strict";
/**
 * @param node
 * @returns {[]}
 */
var next = (function() {
   var TEXT_NODE_TYPE = 3;
   var COMMENT_NODE_TYPE = 8;

   return function(node) {
      var nextSibling = node;
      do {
         nextSibling = nextSibling.nextSibling;
      } while (nextSibling && (nextSibling.nodeType === TEXT_NODE_TYPE || nextSibling.nodeType === COMMENT_NODE_TYPE));
      return nextSibling;
   }
}());