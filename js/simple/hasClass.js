/**
 *03.12.2014                           16:56
 *   Project name: tool_box
 *           File:  hasClass
 **/
"use strict";
/**
 *
 * @param node
 * @param className
 * @returns {boolean}
 */
function hasClass(node, className) {
    var classArr;
    if ((node) && (className)) {
        classArr = node.className.split(' ');

        if (Object.prototype.toString.call(className) !== '[object Array]') {
            className = className.split(' ');
        }

        return className.every(function (iarr) {
            if (classArr.indexOf(iarr) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }
}

// Usage:
// hasClass($0, 'button')

// Result: true

