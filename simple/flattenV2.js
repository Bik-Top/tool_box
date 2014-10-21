//Из двумерного массива сделать одномерный
//На первом уровне может быть как массив, так и не массив. 
//------------------------------------------------------v2
function isArr(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
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