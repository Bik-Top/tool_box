// Проверить является ли массив подмножеством другого массива
// Функция принимает аргументами 2 массива. Возвращает true, если все элементы второго массива являются 
// элементами первого. Массивы могут содержать любые значения
function contains(a, b) {
    var flag = 0;
    for (var i = 0; i < b.length; i += 1) {
        for (var j = 0; j < a.length; j += 1) {
            if (b[i] === a[j]) {
                flag += 1;
            }
        }
    }
    if (flag === b.length) {
        return true;
    } else {
        return false;
    }
}
/*
contains([1,2,3,4,5,6,7,8,9], [1,2]); // true
contains([1,2,3,4,5,6,7,8,9], [1,2]); // true
contains([1,2,3,4,5,6,7,8,9], []); // true
contains([1,2,3,4,5,6,7,8,9], [0]); // false
contains([], [0]); // false
contains([], []); // true
contains([1], [1]); // true
*/