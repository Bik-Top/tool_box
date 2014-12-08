/**
removeClass(node, className) 
Удаляет классы у узла. Если название класса повторяется, удаляются все вхождения повторяющихся классов.


 * Removes all classes, that match className (which can be either string or array)
 * @param  {DOMNode} node      
 * @param  {String|Array} className

function removeClass(node, className) {

}
 */
function removeClass(node, name) {
    var arr = node.className.split(' ');
    arr.splice(arr.indexOf(name) ,1);
    node.className = arr.join(' ');
}
/**
 *
 * @param node
 * @param className
 */
function removeClass(node, className) {
   if ((node) && (className)) {
      var classArr = node.className.split(' ');

      if (Object.prototype.toString.call(className) !== '[object Array]') {
         className = className.split(' ');
      }

      classArr = classArr.filter(function(iArr) {
         return className.indexOf(iArr) === -1;
      });

      node.className = classArr.join(' ');
   }
}

/**
 *
 * @param node
 * @param className
 */
function removeClass(node, className){
   var re = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
   node.className = node.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}
// реализация взята с http://javascript.ru/
