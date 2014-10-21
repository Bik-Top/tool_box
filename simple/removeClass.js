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
// мой велосипед;)