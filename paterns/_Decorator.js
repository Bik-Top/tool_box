/**
 *
 * @param param
 * @constructor
 */
function Ball(param) {
   this._radius = param.radius;
   this._color = param.color;
}
Ball.prototype = {
   constructor: Ball,
   INCREMENTATION_STEP: 5,
   draw: function () {
      console.log("ball drawn with radius:" + this._radius + " and color: " + this._color)
   },
   inc: function () {
      this._radius += this.INCREMENTATION_STEP
   }
};


// Usage:
var ball= new Ball({ radius: 100, color: "red"});


/**
 *  есть решение 2*f
 * @param f
 * @returns {Function}
 */
function doublingDecorator(f) {
   return function() {
      return 2*f.apply(this, arguments)
   }
}


// Usage:
function sum(a, b) {
   return a + b
}

var doubleSum = doublingDecorator(sum);

alert( doubleSum(1,2) ); // 6
alert( doubleSum(2,3) ); // 10





/**
 *
 * @param initial
 * @param decorate_before
 * @param decorate_after
 * @returns {Function}
 */
function decorate(initial, decorate_before, decorate_after) {
   return function() {
      var initial_call_result;

      if (typeof decorate_before === 'function') {
         decorate_before.apply(this, arguments);
      }
      initial_call_result = initial.apply(this, arguments);
      if (typeof decorate_after === 'function') {
         decorate_after.apply(this, arguments);
      }
      return initial_call_result;
   };
}