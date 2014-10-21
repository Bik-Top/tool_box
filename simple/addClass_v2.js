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
    if (re.test(o.className)) return
    o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
}

// реализация взята с http://javascript.ru/

