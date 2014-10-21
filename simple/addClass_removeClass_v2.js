/**
addClass(node, className)
Не должна добавлять класс, если этот класс уже есть у функции.
 * Adds classes to node element. Does not add class, if it's already presents.
 * @param {DOMNode} node     
 * @param {String} className 
function addClass(node, className) {

}
*/
function addClass(o, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

/**
removeClass(node, className) 
Удаляет классы у узла. Если название класса повторяется, удаляются все вхождения повторяющихся классов.


 * Removes all classes, that match className (which can be either string or array)
 * @param  {DOMNode} node      
 * @param  {String|Array} className

function removeClass(node, className) {

}
 */
function removeClass(o, c){
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}






function addClass(o, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    if (re.test(o.className)) return false ;
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

function removeClass(o, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
    o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}
