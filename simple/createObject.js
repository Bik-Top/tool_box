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