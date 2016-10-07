/**
addClass(node, className)
Не должна добавлять класс, если этот класс уже есть у функции.
 * Adds classes to node element. Does not add class, if it's already presents.
 * @param {DOMNode} node     
 * @param {String} className 
function addClass(node, className) {

}
*/
function addClass(node, name) {
    var arr = node.className.concat([name.replace(/\,/g, ' ')]).split(' ');

    if (unique(arr)) {
        node.className = arr.join(' ');
    }
}
    function unique (arr) {
        var uniqueArray;
        uniqueArray = arr.filter(function(el, index) {
            return arr.indexOf(el) === index;
        });
        return uniqueArray.length === arr.length;
    }
/**
 *
 * @param node
 * @param className
 */
function addClass(node, className) {
   if ((node) && (className)) {
      var classArr = node.className.split(' ');

      if (Object.prototype.toString.call(className) !== '[object Array]') {
         className = className.split(' ');
      }

      className = className.filter(function(iArr) {
         return classArr.indexOf(iArr) === -1;
      });

      className.forEach(function(iArr) {
         classArr.push(iArr);
      });

      node.className = classArr.join(' ');

   }

}


/**
 *
 * @param o
 * @param c
 */
function addClass(o, c) {
   var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
   if (re.test(o.className)) return
   o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}



