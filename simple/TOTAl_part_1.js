/*  надо прочесть http://habrahabr.ru/post/178133/  |
*/
/*
*/
/*                                                  |
*/

//Преобразовать объект в query-string 
//На входе - одноуровневый объект, значения свойств объекта - строки или числа.
function toSearchString(obj) {
    var arr = [''];
    if ( !! obj) {
        for (key in obj) {
            arr.push(key + '=' + obj[key]);
        }
    }
    var result = arr.join('&');
    return result;
}
/*
toSearchString({}); // ''
toSearchString({test: true}); // 'test=true'
toSearchString({num: 10, test: true}); // 'num=10&test=true'
toSearchString({num: 10, test: true, user: 'admin'}); // 'num=10&test=true&user=admin'
*/


//Из двумерного массива сделать одномерный
//На первом уровне может быть как массив, так и не массив.
function flatten(j) {
    var newArr = [];
    for (var i = 0; i < j.length; i++) {
        if (j[i].length) {
            for (var k = 0; k < j[i].length; k++) {
                newArr.push(j[i][k]);
            }
        } else {
            newArr.push(j[i]);
        }
    }
    return newArr;
}
//------------------------------------------------------v2
function isArr(obj) {
    var arr = Object.prototype.toString.call(obj) === "[object Array]";
    var arrObj = Object.prototype.toString.call(obj) === "[object HTMLCollection]";
    var el = Object.prototype.toString.call(obj) === "[object HTMLBodyElement]";
    if (arr) {
        return true;
    } else if (arrObj) {
        return true;
    }
}

function bodyEl(el) {
    return flatten(el.children);
}


function flatten(arr) {
    var res;
    var tempRes;


    res = [];
    for (var i = 0; i < arr.length; i += 1) {
        if (isArr(arr[i])) {
            tempRes = flatten(arr[i]);

            for (var k = 0; k < tempRes.length; k += 1) {
                res.push(tempRes[k]);
            }
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}

/*
flatten([[1], 1, 1]); // [1, 1, 1]
flatten([[[1]], 1]); // [[1], 1]
flatten([]); // []
flatten([{}]); // [{}]
flatten([[{}], []]); // [{}, []]
*/

//Из одномерного массива, сделать двумерный
//Функция принимает 2 аргумента: массив и число. Число показывает количество элементов в подмассивах
function toMatrix(j, d) {
    var newAr = [];
    var arTime = [];
    for (i = 0; i < j.length; i++) {
        arTime.push(j[i]);
        if (arTime.length == d) {
            newAr.push(arTime);
            arTime = [];
        }
    }
    if (arTime.length > 0 && arTime.length < d) {
        newAr.push(arTime);
    }
    return (newAr);
}
/*
toMatrix([1,2,3,4,5,6,7,8,9], 3); // [[1,2,3], [4,5,6], [7,8,9]]
toMatrix([1,2,3,4,5,6,7], 3); // [[1,2,3], [4,5,6], [7]]
toMatrix([1,2,3], 5); // [[1,2,3]]
toMatrix([], 3); // []
*/



// Создать объект из массивов ключей и значений 
// Функция принимает аргументами 2 массива: первый - массив ключей, второй - значений. Если ключей меньше, чем 
// значений, игнорировать не вмещающиеся значения. Если ключей больше, чем значений, установить значения в undefined
function createObject(a, b) {
    result = {};
    for (var i = 0; i < a.length; i++) {
        result[a[i]] = b[i];
    }
    return result;
}
/*
createObject(['name', 'age'], ['Vasiliy', 45]); // {name: 'Vasiliy', age: '45'}
createObject(['name', 'age'], ['Vasiliy']); // {name: 'Vasiliy', age: undefined}
createObject(['name'], ['Vasiliy', 45]); // {name: 'Vasiliy'}
createObject([], []); // {}
*/




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

// __________________________________________________________________________
// ==========================================================================






;(function() {
    var inp = document.querySelectorAll('.point2 input');
    for (var i = 0; i < inp.length; i++) {
        inp[i].addEventListener("click", chk, false);
    }

    function chk(as) {
        for (var i = 0; i < inp.length; i++) {
            if (inp[i].checked === true) {
                inp[i].nextElementSibling.style.color = '#CC391F';
            } else {
                inp[i].nextElementSibling.style.color = '#525252';
            }
        }
    }
})();