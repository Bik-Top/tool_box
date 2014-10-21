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
/*
flatten([[1], 1, 1]); // [1, 1, 1]
flatten([[[1]], 1]); // [[1], 1]
flatten([]); // []
flatten([{}]); // [{}]
flatten([[{}], []]); // [{}, []]
*/