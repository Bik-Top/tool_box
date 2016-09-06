/**
 *05.12.2014                           15:08
 *   Project name: tool_box
 *           File:  Modul
 **/
"use strict";
/**
 * @type module
 */
var module = function () {
   function method1() {
   }

   function method2() {
   }

   function method3() {
   }

   return {
      method1: method1,
      method2: method2,
      method3: method3
   };
}();



var MyModule = (function () {
// @constructor
   var MyModule = function () {};

// @type {{}}
   MyModule.prototype = {
      // ...
      hi:function() {console.log(11111);}
   };
   //myModule =new MyModule
   return myModule;
})();

//RUN
var myModule =new MyModule;
myModule.hi();