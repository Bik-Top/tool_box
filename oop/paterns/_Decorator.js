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
    paper: function(tagName){
        if(tagName === 'svg'){
            var xmlns = "http://www.w3.org/2000/svg";
            var tag = document.createElementNS (xmlns, "svg");
            tag.className = "paper";
            //tag.setAttribute( 'xmlns', "http://www.w3.org/2000/svg");
            //tag.setAttribute( 'xmlns:xlink', "http://www.w3.org/1999/xlink");
            tag.setAttribute( 'viewbox', "0 0 100 100");
            tag.setAttribute( 'style', ' width: 100px; height: 100px; display: block; background: #ccc;');
        }
        if(tagName === 'canvas'){
            tag = document.createElement('canvas');
        }
        document.body.appendChild(tag);
    },

    draw: function () {
        console.log("ball drawn with radius:" + this._radius + " and color: " + this._color);
        if(document.querySelector("canvas")){
            var cx = document.querySelector("canvas").getContext("2d");
            cx.beginPath();
            cx.moveTo(10, 90);// control=(60,10) goal=(90,90)
            cx.quadraticCurveTo(60, 10, 90, 90);
            cx.lineTo(60, 10);
            cx.closePath();
            cx.stroke();
        }
        if(document.querySelector("svg")){
            var svg = document.querySelector("svg");
            svg.innerHTML = '<circle cx="50" cy="50" r="50" fill="#ff0"/>';
            /*  var tag = document.createElement('circle');
             tag.setAttribute("cx", "50");
             tag.setAttribute("cy", "50");
             tag.setAttribute("r", this._radius);
             tag.setAttribute("fill", this._color);*/


            //svg.appendChild(tag);

        }

    },
    inc: function () {
        this._radius += this.INCREMENTATION_STEP
    }
};


// Usage:
var ball= new Ball({ radius: 50, color: "#f0f"});
ball.paper('svg');
ball.draw();

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