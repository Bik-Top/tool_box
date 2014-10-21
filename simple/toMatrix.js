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