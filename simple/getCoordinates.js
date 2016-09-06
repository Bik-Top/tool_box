/**
 *03.12.2014                           16:00
 *   Project name: tool_box
 *           File:  getCoordinates
 **/
"use strict";
/**
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
function getCoordinates(elem) {
    var box = elem.getBoundingClientRect();

    var body    = document.body;
    var docElem = document.documentElement;

    var scrollTop  = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop  = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {
        top : Math.round(top),
        left: Math.round(left)
    };
}

// Usage:
// getCoordinates(node)

// Result: Object {top: 206, left: 8}
