/**
 *
 * @constructor
 */
function Foo() {
  //...
}
function Bar() {
  //...
}

/**
 *
 * @param type
 * @returns {*}
 */
function factory(type) {
  if (type == '1') {
    return new Foo();
  }
  else if (type == '2') {
    return new Bar();
  }
}










var Shapes = {
   Circle: function (param) {
      console.log(param);
      //console.log("new " + param.color + " circle created with radius " + param.radius + "px");
   },
   Square: function (param) {
      console.log("new " + param.color + " square created with " + param.side + "px on a side ");
   },
   Triangle: function (param) {
      console.log("new " + param.color + " triangle created with " + param.side + "px on a side ");
   }
};


function ShapeFactory(size, color) {
   this.size = size;
   this.color = color;
}


ShapeFactory.prototype = {
   constructor: ShapeFactory,
   makeCircle: function () {
      return new Shapes.Circle({
         radius: this.size / 2,
         color: this.color
      });
   },
   makeSquare: function () {
      return new Shapes.Square({
         side: this.size,
         color: this.color
      });
   },
   makeTrinagle: function () {
      return new Shapes.Triangle({
         side: this.size,
         color: this.color
      });
   }
};



var init = new ShapeFactory(100, "red");
init.makeSquare();
init.makeSquare();
init.makeTrinagle();
init.makeCircle();
init.makeTrinagle();
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
