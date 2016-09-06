/**
 *03.12.2014                           12:30
 *   Project name: tool_box
 *           File:  closest
 **/
"use strict";
/**
 *
 * @param node
 * @param callback
 * @returns {*}
 */
var closest = function(node, callback) {
   var nextParent = node;

   while (nextParent && (!callback(nextParent))) {
      nextParent = nextParent.parentNode;
   }
   return nextParent;
};

// Usage:
closest(document.body, function(node) {
   return node.nodeName === 'BODY';
});