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
// мой велосипед;)

