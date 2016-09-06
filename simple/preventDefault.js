/**
 *04.12.2014                           12:51
 *   Project name: tool_box
 *           File:  preventDefault
 **/
"use strict";
/**
 *
 * @param event
 */
function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

// Usage:
// <a class="button" onclick="event.preventDefault()" href="#"